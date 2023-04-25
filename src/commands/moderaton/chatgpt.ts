import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder } from "discord.js";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);

export const command: CommandDefinition = {
    name: "chatgpt",
    description: "Ask chatgpt something",
    permissions: ["ManageMessages"],
    category: CommandCategories.MODERATION,
    execute: async (client, message, args) => {
        const question = args.slice(0).join(" ");

        if (!question) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("ChatGPT Error | Missing Query")
                    .setDescription("Please provide a question for ChatGPT to answer")]
        })

        try {
            const res = await openai.createCompletion({
                model: "text-davinci-003",
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question
            });

            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`${question}`)
            .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            message.channel.send({embeds: [embed]});

        } catch (e) {
            return message.reply(`Request failed (bozo). This is probably because the question you inputted is too long. Remember, this is only a mini version of ChatGPT.`)
        }
    }
}