import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
const warningSchema = require("../../lib/schemas/warnSchema");
import { EmbedBuilder } from "discord.js";

export const command: CommandDefinition = {
    name: "clearwarn",
    description: "Clear a user's warnings in the server",
    permissions: ["ModerateMembers"],
    aliases: ["clear"],
    category: CommandCategories.MODERATION,
    execute: async (client, message, args) => {

        const guildID = message.guild.id;

        const member = message.mentions.members?.first();

        if (!member) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Warn Error | Missing Query")
                    .setDescription("Please use the following format: `.clearwarn <user>`")]
        })

        const embed = new EmbedBuilder()

        warningSchema.findOne({GuildID: guildID, UserID: member.user.id, UserTag: member.user.tag }).then( data => {

        //if (err) throw err;

        if (data) {
                warningSchema.findOneAndDelete({ GuildID: guildID, UserID: member.id, UserTag: member.user.tag })

                embed.setColor("Blue")
                .setDescription(`:white_check_mark: ${member.user.tag}'s warnings have been cleared!`)

                message.channel.send({embeds: [embed]});
        } else {
            message.reply(`${member.user.tag} has no warnings to be cleared. `)
        }

        });
    }
}