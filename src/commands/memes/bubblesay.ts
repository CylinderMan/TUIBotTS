import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import figlet from "figlet";

export const command: CommandDefinition = {
    name: "bubblesay",
    description: "Send a bubble message!",
    aliases: ["bubble"],
    category: CommandCategories.MEMES,
    execute: async (client, message, args) => {
        const text = args.slice(0).join(" ");

        if (!text) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Bubble Error | Missing Query")
                    .setDescription("You must provide some text")]
        })

        figlet.text(
            text,
            {
              font: "Standard",
            },
            async (err, data) => {
              message.channel.send(`\`\`\`${data}\`\`\``);
            }
          );
    }
}