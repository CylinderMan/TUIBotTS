import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";

export const command: CommandDefinition = {
    name: "ping",
    description: "Check the bot's latency",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        message.channel.send(`Pong! Your ping is at a whopping **${client.ws.ping}**ms`)
    }
}