import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "denied",
    description: "Guide members on why they are denied",
    category: CommandCategories.COMMUNITY,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
        .setTitle("Denied")
        .setColor("#2091eb")
        .setDescription(`Your application has so been denied. This might be the case for various reasons: \n 1. You cheated\n 2. You didn't give enough detail.\n 3. Your responses are inaccurate.\n 4. We don't believe you are qualified for the position `)
 
        message.reply({embeds: [embed]});
    }
}