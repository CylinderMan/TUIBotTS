import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "faq",
    description: "Guide members on the FAQ channel",
    category: CommandCategories.COMMUNITY,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
       .setTitle("Frequently Asked Questions")
       .setColor("#2091eb")
       .setDescription("Our FAQ is mentioned in <#1090334477298970674>.")

       message.reply({embeds: [embed]});
    }
}