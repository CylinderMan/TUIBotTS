import { Event, CommandDefinition } from "../handlers";
import { Message, EmbedBuilder } from "discord.js";

export const event: Event = {
    name: "messageCreate",
    execute: (client, message: Message) => {
        if (
            message.author.bot ||
            !message.guild ||
            !message.content.startsWith(client.config.prefix)
        ) return;

        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (!cmd) return;

        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (!command) return;

        const hasPerms = !command.permissions || message.member.permissions.has(command.permissions);

        if (!hasPerms) {
            try {
                message.reply({
                    embeds: [new EmbedBuilder().setColor("Red").setTitle('Command Requirements').setDescription('You do not have the required permissions to use that command!')],
                });
            } catch (error) {
                console.error(error);
            }
            return;
        }

        try {
            (command as CommandDefinition).execute(client, message, args);
        } catch (error) {
            console.error(error);
        }
    }
}