import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder, TextChannel } from "discord.js";

export const command: CommandDefinition = {
    name: "purge",
    description: "Purge messages in a server",
    permissions: ["ModerateMembers"],
    category: CommandCategories.MODERATION,
    execute: async (client, message, args) => {

        const number = parseInt(args.slice(0).join(" "));
        const logChannel = message.guild.channels.cache.get("1090660013661491300") as TextChannel;

        if (!number) {
            return message.reply({
                embeds: [new EmbedBuilder().setColor("Red").setTitle("Purge Error | Missing Query").setDescription("Please use the following format: `.purge <number>`")],
            });
        }

        if (isNaN(number)) {
            return message.reply("Specify a valid number of messages to delete!");
        }

        if (number > 100) {
            return message.reply("You need to specify a number less than 100.");
        }

        if (number < 1) {
            return message.reply("You need to specify a number that is greater than 0.");
        }

        message.delete();
        if (!(message.channel instanceof TextChannel)) return;
        await message.channel.bulkDelete(number);

        const logEmbed = new EmbedBuilder()
            .setTitle("Bulk Delete")
            .setDescription(`**Bulk delete in <#${message.channel.id}>, ${number} messages deleted**.`)
            .setColor("Blue")
            .setTimestamp();

        logChannel.send({ embeds: [logEmbed] });


    }
}