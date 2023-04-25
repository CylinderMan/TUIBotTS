import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder, TextChannel } from "discord.js";

export const command: CommandDefinition = {
    name: "say",
    description: "Make the bot say something",
    category: CommandCategories.MODERATION,
    permissions: ["ManageMessages"],
    execute: async (client, message, args) => {
        const channel = message.mentions.channels.first() as TextChannel;
        const m = args.slice(1).join(" ");

        if (!channel) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Say Error | Missing Query")
                    .setDescription("Please use the following format: `.say <channel> <text>`")]
        })

        if (!m) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Say Error | Missing Query")
                    .setDescription("Please use the following format: `.say <channel> <text>`")]
        })

        message.delete();
        channel.send(m)
    }
}