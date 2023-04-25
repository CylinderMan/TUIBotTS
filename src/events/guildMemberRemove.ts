import { Event, CommandDefinition } from "../handlers";
import { GuildMember, EmbedBuilder, TextChannel } from "discord.js";

export const event: Event = {
    name: "guildMemberRemove",
    execute: (client, member: GuildMember) => {
        const leaveChannel = member.guild.channels.cache.get("1090332036058861718") as TextChannel;

        const leaveEmbed = new EmbedBuilder()
        .setTitle(`${member.user.username} has departed! :airplane_departure:`)
        .setDescription("We hope to see you again soon!")
        .setColor("Red")
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({text: `ID: ${member.user.id}`})
        .setTimestamp()

        leaveChannel.send({embeds: [leaveEmbed]})
    }
}