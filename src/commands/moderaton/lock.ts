import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder, TextChannel } from "discord.js";

export const command: CommandDefinition = {
    name: "lock",
    description: "Lock a channel",
    category: CommandCategories.MODERATION,
    permissions: ["ManageChannels"],
    execute: async (client, message, args) => {
        const channel = message.mentions.channels.first() as TextChannel;
        const reason = args.slice(1).join(" ");

        const logChannel = message.guild.channels.cache.find(c => c.name === "bot-logs") as TextChannel;

        if (!channel) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Lock Error | Missing Query")
                    .setDescription("Please use the following format: `.lock <channel> <reason>`")]
        })

        if (!reason) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Lock Error | Missing Query")
                    .setDescription("Please use the following format: `.say <channel> <reason>`")]
        })

        
        const memberRole = message.guild.roles.cache.get("1090330531541033151")
    
        if (channel instanceof TextChannel) {
            channel.permissionOverwrites.create(memberRole, { SendMessages: false });
        }
    
        const successEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`***Channel has been locked.*** | ${reason}`)
        .setTimestamp()
    
        const logEmbed = new EmbedBuilder()
        .setTitle(`Channel locked | ${channel.name}`)   
        .setColor("Red")
        .addFields(
            {name: "Channel Locked", value: `${channel.name}`},
            {name: "Responsible Moderator", value: `${message.author}`},
            {name: "Reason", value: `${reason}`}
        )
        .setTimestamp()
    
        message.channel.send({embeds: [successEmbed]})
       logChannel.send({embeds: [logEmbed]});
    }
}