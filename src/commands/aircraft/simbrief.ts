import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder } from "discord.js";

export const command: CommandDefinition = {
    name: "simbrief",
    description: "Takes you to the Simbrief website",
    category: CommandCategories.AIRCRAFT,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
        .setTitle("Simbrief")
        .setColor("#2091eb")
        .setDescription(`The Simbrief website is [here](https://dispatch.simbrief.com/home).`)
 
        message.reply({embeds: [embed]});
    }
}