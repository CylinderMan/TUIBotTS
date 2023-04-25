import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder, PermissionFlagsBits, TextChannel } from "discord.js";

export const command: CommandDefinition = {
    name: "kick",
    description: "Kick a user from the server",
    permissions: ["KickMembers"],
    category: CommandCategories.MODERATION,
    execute: async (client, message, args) => {

        const member = message.mentions.members?.first();
        if (!member) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Kick Error | Missing Query")
                    .setDescription("Please use the following format: `.kick <user> <reason>`")]
        })

        const reason = args.slice(1).join(" ");
        if (!reason) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Kick Error | Missing Query")
                    .setDescription("Please use the following format: `.kick <user> <reason>`")]
        })

        try {
            // ban the member and send a DM
            await member.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setTitle('You have been kicked from TUI [PTFS]')
                        .setDescription(`Reason: ${reason}`)
                        .setTimestamp(),
                ],
            });

            await member.kick();

            // send a kick log
            const logEmbed = new EmbedBuilder()
                .setColor("Red")
                .setTitle('Member kicked')
                .setDescription(`**${member.user.tag}** has been kicked by **${message.author.tag}**!`)
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
            .setDescription(`:white_check_mark: ***Successfully kicked ${member.user.tag}*** | ${reason}`)
            .setColor("Green")
            .setFooter({text: `User ID: ${member.id}`})
            message.channel.send({embeds: [successEmbed]})
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to kicked the member!');
        }
    }
}