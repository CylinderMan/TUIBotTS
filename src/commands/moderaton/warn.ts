import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
const warningSchema = require("../../lib/schemas/warnSchema");
import { EmbedBuilder, TextChannel } from "discord.js";

export const command: CommandDefinition = {
    name: "warn",
    description: "Warn a user in the server",
    permissions: ["ModerateMembers"],
    category: CommandCategories.MODERATION,
    execute: async (client, message, args) => {

        const guildID = message.guild.id;

        const member = message.mentions.members?.first();

        if (!member) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Warn Error | Missing Query")
                    .setDescription("Please use the following format: `.warn <user> <reason>`")]
        })

        const reason = args.slice(1).join(" ");
        if (!reason) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Warn Error | Missing Query")
                    .setDescription("Please use the following format: `.warn <user> <reason>`")]
        })

        try {
            await member.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setTitle('You have been warned in TUI [PTFS]')
                        .setDescription(`Reason: ${reason}`)
                        .setTimestamp(),
                ],
            });

            warningSchema.findOne({GuildID: guildID, UserID: member.id, UserTag: member.user.tag }).then( data => {
    
                // if (err) throw err;
         
                 if (!data) {
                     data = new warningSchema({
                         GuildID: guildID,
                         UserID: member.id,
                         UserTag: member.user.tag,
                         Content: [
                             {
                                 ExecuterID: member.id,
                                 ExecuterTag: member.user.tag,
                                 Reason: reason
                             }
                         ],
                     });
                 } else {
                     const warnContent = {
                         ExecuterID: message.author.id,
                         ExecuterTag: message.author.tag,
                         Reason: reason
                     }
                     data.Content.push(warnContent);
                 }
                 data.save()
             });

            const logEmbed = new EmbedBuilder()
                .setColor("Red")
                .setTitle('Member warned')
                .setDescription(`**${member.user.tag}** has been warned by **${message.author.tag}**!`)
                .addFields(
                    {name: "Reason", value: `${reason}`}
                )
                .setTimestamp();

                const logChannel = message.guild.channels.cache.find(c => c.name === "bot-logs") as TextChannel;
            if (logChannel) {
                logChannel.send({ embeds: [logEmbed] });
            }

            const successEmbed = new EmbedBuilder()
            .setDescription(`:white_check_mark: ***Successfully warned ${member.user.tag}*** | ${reason}`)
            .setColor("Green")
            .setFooter({text: `User ID: ${member.id}`})
            message.channel.send({embeds: [successEmbed]})
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to warn the member!');
        }
    }
}