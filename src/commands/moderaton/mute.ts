import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder, PermissionFlagsBits, TextChannel } from "discord.js";
import ms from "ms";

export const command: CommandDefinition = {
    name: "mute",
    description: "Mute a user from the server",
    permissions: ["MuteMembers"],
    category: CommandCategories.MODERATION,
    execute: async (client, message, args) => {

        const member = message.mentions.members?.first();
        if (!member) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Mute Error | Missing Query")
                    .setDescription("Please use the following format: `.mute <user> <reason> <time>`")]
        })

        const reason = args.slice(1).join(" ");
        if (!reason) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Mute Error | Missing Query")
                    .setDescription("Please use the following format: `.mute <user> <reason> <time>`")]
        })

        const time = args.slice(2).join(" ");
        if (!time) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Mute Error | Missing Query")
                    .setDescription("Please use the following format: `.mute <user> <reason> <time>`")]
        })

        let parsedTime = ms(time);

        try {
            await member.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setTitle('You have been muted in TUI [PTFS]')
                        .setDescription(`Reason: ${reason}`)
                        .setTimestamp(),
                ],
            });

            await member.timeout(parsedTime, reason);

            // send a ban log
            const logEmbed = new EmbedBuilder()
                .setColor("Red")
                .setTitle('Member Muted')
                .setDescription(`**${member.user.tag}** has been muted by **${message.author.tag}**!`)
                .addFields(
                    {name: "Reason", value: `${reason}`}
                )
                .setTimestamp();

                const logChannel = message.guild.channels.cache.find(c => c.name === "bot-logs") as TextChannel;
            if (logChannel) {
                logChannel.send({ embeds: [logEmbed] });
            }

            // send a success message
            const successEmbed = new EmbedBuilder()
            .setDescription(`:white_check_mark: ***Successfully muted ${member.user.tag}*** | ${reason}`)
            .setColor("Green")
            .setFooter({text: `User ID: ${member.id}`})
            message.channel.send({embeds: [successEmbed]})
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to mute the member!');
        }
    }
}