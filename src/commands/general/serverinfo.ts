import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder, ChannelType} from "discord.js";

export const command: CommandDefinition = {
    name: "serverinfo",
    description: "Get information about the server",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const guild = message.guild;
        const name = guild.name;
        const icon = guild.iconURL()
        const serverId = guild.id;
        const creationDate = Math.floor(guild.createdTimestamp / 1000);
        const owner = await guild.fetchOwner();
        const members = await guild.memberCount;
        const textChannels = guild.channels.cache.filter((c) => 
            c.type === ChannelType.GuildText).size;
    
        const voiceChannels = guild.channels.cache.filter((c) => 
            c.type === ChannelType.GuildVoice).size;
    
        const roles = guild.roles.cache.size;
        const totalBoosts = guild.premiumSubscriptionCount;
        let boostTier = guild.premiumTier;
        
        const embed = new EmbedBuilder()
        .setColor("Random")
        .setThumbnail(icon)
        .setTitle("Server Info")
        .setDescription(`**${name}'s** server information`)
        .addFields(
            { name: `:id: Server ID`, value: `${serverId}`},
            { name: `:calendar: Created at`, value: `<t:${creationDate}>`},
            { name: `:crown: Owned by`, value: `${owner}`},
            {name: `:busts_in_silhouette: Member Count`, value: `${members}`},
            {name: `:speech_balloon: Text Channels`, value: `${textChannels}`},
            {name: `:microphone2: Voice Channels`, value: `${voiceChannels}`},
            {name: `:label: Roles`, value: `${roles}`},
            {name: `:crystal_ball: Total Boosts`, value: `${totalBoosts}`},
            {name: `:medal: Boost Teir`, value: `${boostTier}/3`},
        )
        .setTimestamp()
    
        message.channel.send({embeds: [embed]});
    }
}