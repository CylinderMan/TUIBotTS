import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import translate from "translate-google";

export const command: CommandDefinition = {
    name: "translate",
    description: "Translate a language from one to another",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const text = args.slice(0, -1).join(' ');
        const target = args[args.length - 1];

        if (!text) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Translate Error | Missing Query")
                    .setDescription("You must provide a language to translate")]
        })

        if (!target) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Translate Error | Missing Query")
                    .setDescription("You must provide a secondary language")]
        })

        try {
            const translation = await translate(text, { to: target });
        
            const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`**"${text}"** has been translated to ${target}: **${translation}**`)
        
            message.channel.send({embeds: [embed]});
          } catch (error) {
            console.error(error);
            message.reply('There was an error translating the text');
          }
    }
}