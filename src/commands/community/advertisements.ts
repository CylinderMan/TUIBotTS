import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "advertisements",
    description: "Guide members on advertising",
    category: CommandCategories.COMMUNITY,
    aliases: ["ads"],
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
       .setTitle("Advertisements")
       .setColor("#2091eb")
       .setDescription("You may advertise in <#1090340740774764564>. Be sure to read the pins first.")

       message.reply({embeds: [embed]});
    }
}