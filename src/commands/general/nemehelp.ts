import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "memehelp",
    description: "See the meme help commands",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
        .setTitle("Memes")
        .setColor(`#2091eb`)
        .addFields(
         {name: ".deadchat", value: "Revive da chat `.deadchat`"},
         {name: ".meme", value: "Gives you a random meme `.meme`"},
         {name: ".bubblesay", value: "Send a bubble message! `.bubblesay <message>`"},
        )
 
         message.channel.send({embeds: [embed]});
    }
}