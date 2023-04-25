import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "when",
    description: "Guide members on when a flight/event starts.",
    category: CommandCategories.COMMUNITY,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
       .setTitle("When is there a flight?")
       .setColor("#2091eb")
       .setDescription("We offer details on forthcoming flights in <#1094196448108752977>. We make every effort to host a flight, usually on weekends.")

       message.reply({embeds: [embed]});
    }
}