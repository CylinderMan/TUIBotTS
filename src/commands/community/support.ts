import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "support",
    description: "Guide members to the support channel.",
    category: CommandCategories.COMMUNITY,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
       .setTitle("Support")
       .setColor("#2091eb")
       .setDescription("Do you require assistance? Open a ticket in <#1090341360256688158> or DM <@1063906922945859705>.")

       message.reply({embeds: [embed]});
    }
}