import { Client, Collection } from "discord.js";
import { connect } from "mongoose";
import path from "path";
import { readdirSync } from "fs";
import { CommandDefinition, Event, Config } from "../handlers";
import ConfigJson from "../config.json";
import ascii from "ascii-table";

const table = new ascii("COMMANDS, STATUS");

class ExtendedClient extends Client {
    public commands: Collection<string, CommandDefinition> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config: Config = ConfigJson;
    public aliases: Collection<string, CommandDefinition> = new Collection();

    public async init() {
        this.login(this.config.token);
        console.log("Bot is now online!")
        connect(this.config.mongodb, {
            keepAlive: true
        })

        if (connect) {
            console.log("MongoDB connection successful")
        }

        const commandPath = path.join(__dirname, "..", "commands");
        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
                file.endsWith(".ts")
            );

            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);
                table.addRow(command.name, "Working");

                if (command?.aliases?.length) {
                    command.aliases.forEach((alias) => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        });

        const eventPath = path.join(__dirname, "..", "events");
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            table.addRow(event.name, "Working");
            this.on(event.name, event.execute.bind(null, this))
        })
    }
}

export default ExtendedClient;