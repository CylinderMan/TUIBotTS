import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
const wiki = require("wikijs").default();

export const command: CommandDefinition = {
    name: "wikipedia",
    description: "Search up something on wikipedia",
    aliases: ["wiki"],
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const query = args.slice(0).join(" ");

        if (!query) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Wiki Error | Missing Query")
                    .setDescription("You must provide something to search up")]
        })

        const search = await wiki.search(query);
        if (!search.results.length) return message.reply("Wikipedia doesn't seem to know what you are talking about...");

        const result = await wiki.page(search.results[0]);

        const summary = await result.summary()
        if (summary.length > 8192) return await message.reply(`${summary.slice(0, 2048)}`);
        else {
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Wiki Search: ${result.raw.title}`)
            .setDescription(`\`\`\`${summary.slice(0, 2048)}\`\`\``)

            await message.reply({embeds: [embed]});
        }
    }
}
