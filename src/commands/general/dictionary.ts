import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder } from "discord.js";

export const command: CommandDefinition = {
    name: "dictionary",
    description: "Look up a word in the dictionary",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const word = args.slice(0).join(" ");

        if (!word) return message.reply({embeds: 
            [new EmbedBuilder().setColor("Red").setTitle("Dictionary Error | Missing Query")
            .setDescription("You must provide a word to look up")]})

        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        if (data.statusText === "Not Found") {
            return message.reply( "That word does not exist!")
        }

        let info = await data.json();
        let result = info[0];

        let embedInfo = await result.meanings.map((data, index) => {
            let definition = data.definitions[0].definition || "No definition found";
            let example = data.definitions[0].example || "No example found";

            return {
                name: data.partOfSpeech.toUpperCase(),
                value: `\`\`\` Definition: ${definition} \n Example: ${example} \`\`\``
            };
        });

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Definition of | **${result.word}**`)
        .addFields(embedInfo)

        await message.reply({embeds: [embed]});
    }
}