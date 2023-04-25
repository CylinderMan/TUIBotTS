import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "rules",
    description: "Guide members to the rules channel",
    category: CommandCategories.COMMUNITY,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
       .setTitle("Rules")
       .setColor("#2091eb")
       .setDescription("Do you ever need reminding? In <#1090334111677284383>, our regulations are mentioned.")

       message.reply({embeds: [embed]});
    }
}