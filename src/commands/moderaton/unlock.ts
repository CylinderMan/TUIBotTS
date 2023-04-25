import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder, TextChannel } from "discord.js";

export const command: CommandDefinition = {
    name: "unlock",
    description: "Unlock a channel",
    category: CommandCategories.MODERATION,
    permissions: ["ManageChannels"],
    execute: async (client, message, args) => {
        const channel = message.mentions.channels.first() as TextChannel;

        const logChannel = message.guild.channels.cache.find(c => c.name === "bot-logs") as TextChannel;

        if (!channel) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Unlock Error | Missing Query")
                    .setDescription("Please use the following format: `.unlock <channel>")]
        })
        
        const memberRole = message.guild.roles.cache.get("1090330531541033151")
    
        if (channel instanceof TextChannel) {
            channel.permissionOverwrites.create(memberRole, { SendMessages: true });
        }
    
        const successEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`***Channel has been unlocked.***`)
        .setTimestamp()
    
        const logEmbed = new EmbedBuilder()
        .setTitle(`Channel unlocked | ${channel.name}`)   
        .setColor("Red")
        .addFields(
            {name: "Channel unlocked", value: `${channel.name}`},
            {name: "Responsible Moderator", value: `${message.author}`},
        )
        .setTimestamp()
    
        message.channel.send({embeds: [successEmbed]})
       logChannel.send({embeds: [logEmbed]});
    }
}