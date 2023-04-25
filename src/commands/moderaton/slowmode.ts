import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder, TextChannel } from "discord.js";

export const command: CommandDefinition = {
    name: "slowmode",
    description: "Set the slowmode on a channel",
    permissions: ["ModerateMembers"],
    aliases: ["sm"],
    category: CommandCategories.MODERATION,
    execute: async (client, message, args) => {

        const number = parseInt(args.slice(0).join(" "));

        if (!number) {
            return message.reply({
                embeds: [new EmbedBuilder().setColor("Red").setTitle("Slowmode Error | Missing Query").setDescription("Please use the following format: `.slowmode <number>`")],
            });
        }

        if(number < 0) return message.reply("You need to specify a positive number!");
        if(number > 21600) return message.reply("You need to specify a time that is less than 6 hours!");

        if (!(message.channel instanceof TextChannel)) return;
        await message.channel.setRateLimitPerUser(number);
        await message.channel.send(`Successfully set the slowmode on this channel to \`${number}\` seconds.`)
    }
}