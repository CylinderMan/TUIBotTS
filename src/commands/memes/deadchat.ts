import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "deadchat",
    description: "Send this when the chat is dead",
    category: CommandCategories.MEMES,
    execute: async (client, message, args) => {
        message.channel.send(`https://tenor.com/view/dead-chat-alive-chat-almost-dead-chat-almost-alive-chat-half-life-gif-21154500`)
    }
}