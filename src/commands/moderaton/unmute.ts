import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder, PermissionFlagsBits, TextChannel } from "discord.js";

export const command: CommandDefinition = {
    name: "unmute",
    description: "Unmute a user from the server",
    permissions: ["MuteMembers"],
    category: CommandCategories.MODERATION,
    execute: async (client, message, args) => {

        const member = message.mentions.members?.first();
        if (!member) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Unmute Error | Missing Query")
                    .setDescription("Please use the following format: `.unmute <user>`")]
        })

        try {
            await member.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setTitle('You have been unmuted in TUI [PTFS]')
                        .setTimestamp(),
                ],
            });

            member.timeout(null, "Member unmuted");

            // send a ban log
            const logEmbed = new EmbedBuilder()
                .setColor("Red")
                .setTitle('Member Unmuted')
                .setDescription(`**${member.user.tag}** has been unmuted by **${message.author.tag}**!`)
                .setTimestamp();

                const logChannel = message.guild.channels.cache.find(c => c.name === "bot-logs") as TextChannel;
            if (logChannel) {
                logChannel.send({ embeds: [logEmbed] });
            }

            // send a success message
            const successEmbed = new EmbedBuilder()
            .setDescription(`:white_check_mark: ***Successfully unmuted ${member.user.tag}***`)
            .setColor("Green")
            .setFooter({text: `User ID: ${member.id}`})
            message.channel.send({embeds: [successEmbed]})
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to mute the member!');
        }
    }
}