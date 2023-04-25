import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
const warningSchema = require("../../lib/schemas/warnSchema");
import { EmbedBuilder } from "discord.js";

export const command: CommandDefinition = {
    name: "warnings",
    description: "Check a users warnings in the server",
    permissions: ["ModerateMembers"],
    aliases: ["warns"],
    category: CommandCategories.MODERATION,
    execute: async (client, message, args) => {

        const guildID = message.guild.id;

        const member = message.mentions.members?.first();

        if (!member) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Warn Error | Missing Query")
                    .setDescription("Please use the following format: `.warnings <user>`")]
        })

        const embed = new EmbedBuilder()
        const noWarns = new EmbedBuilder()
    
        warningSchema.findOne({GuildID: guildID, UserID: member.user.id, UserTag: member.user.tag }).then( data => {
    
           // if (err) throw err;
    
            if (data) {
                embed.setColor("Blue")
                .setDescription(`:white_check_mark: ${member.user.tag}'s warnings: \n${data.Content.map(
                    (w, i) => 
                        `
                            **Warnings:** ${i + 1}
                            **Warning Moderator:** ${w.ExecuterTag}
                            **Warn Reason:** ${w.Reason}
                        `
                ).join('-')}`)
    
                message.channel.send({embeds: [embed]}); 
            } else {
                noWarns.setColor("Blue")
                .setDescription(`:white_check_mark: ${member.user.tag} has no warnings.`)
    
                message.channel.send({embeds: [noWarns]})
            }
            
        });
    }
}