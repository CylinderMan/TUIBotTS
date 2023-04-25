import { Event, CommandDefinition } from "../handlers";
import { GuildMember, EmbedBuilder, TextChannel } from "discord.js";

export const event: Event = {
    name: "guildMemberAdd",
    execute: (client, member: GuildMember) => {
        const welcomeChannel = member.guild.channels.cache.get("1090332036058861718") as TextChannel;
        const welcomeChannel2 = member.guild.channels.cache.get("1089200272632467518") as TextChannel;
    
        const welcomeMessage2 = `Welcome <@${member.id}> to **TUI [PTFS]**! 

Remember to read the <#1090334111677284383>!
Enjoy your stay - make the new member feel welcome 🛬`;
    
    
    const welcomeEmbed = new EmbedBuilder()
            .setTitle(`Welcome ${member.user.username} :wave:`)
            .setDescription(`Welcome to TUI [PTFS]! Any aviation fans are welcome to join and hang out! We also host flights, events and giveaways.`)
            .addFields(
                {name: `:book:`, value: `Make sure to read the <#1090334111677284383>!`},
                {name: `:loudspeaker:`, value: `Why not check out the announcements? <#1090334722942582904>?`},
                {name: `:airplane:`, value: `Look out for upcoming flights in <#1094196448108752977>!`},
                {name: `:calendar:`, value: `Look out for events in <#1090336887480270922>!`},
                {name: `:speaking_head:`, value: `Chat with the community in <#1089200272632467518>.`},
                {name: `:microphone2:`, value: `Get reaction roles in <#1090334254505922681>.`},
            )
            .setColor(`#70CBF4`)
            .setThumbnail(member.user.displayAvatarURL())
            .setImage("https://media.discordapp.net/attachments/1089200272632467518/1094666058411016302/New_Project-26.png")
            .setFooter({text: `User ID: ${member.user.id}`})
            .setTimestamp()

    
            welcomeChannel2.send({content: welcomeMessage2});
            welcomeChannel.send({embeds: [welcomeEmbed]});
    }
}