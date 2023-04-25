import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder } from "discord.js";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);

export const command: CommandDefinition = {
    name: "imagine",
    description: "Generate an image",
    permissions: ["ModerateMembers"],
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const prompt = args.slice(0).join(" ")

        if (!prompt) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Imagine Error | Missing Query")
                    .setDescription("You must provide something to generate")]
        })

        try {
            const response = await openai.createImage({
                prompt: `${ prompt }`,
                n: 1,
                size: `1024x1024`
                });
        const image = response.data.data[0].url;

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Here is your image of a \`\`\`${prompt}\`\`\``)
            .setImage(image)
            .setTimestamp()

        await message.channel.send({ embeds: [embed] });
    } catch(e) {
        console.log(e);
    }
}
}