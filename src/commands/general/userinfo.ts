import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder, ChannelType} from "discord.js";
import moment from "moment";

export const command: CommandDefinition = {
    name: "userinfo",
    description: "Get information about a certain user",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const user = message.mentions.users.first();

        if (!user) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("User Error | Missing Query")
                    .setDescription("You must provide a user")]
        })

        const member = await message.guild.members.fetch(user.id);

        const embed = new EmbedBuilder()
        .setTitle(`${user.username}'s information:`)
        .addFields(
            { name: "Username: ", value: `${user.username}`},
            { name: "ID:", value: `${user.id}`},
            { name: "Roles:", value: `${member.roles.cache.map(r => r).join('').replace("@everyone", "")}`},
            { name: "Server member since:", value: `${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-**${moment(member.joinedAt).startOf('day').fromNow()}`},
            { name: "Discord user since:", value: `${moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-**${moment(user.createdAt).startOf('day').fromNow()}`},
        )
        .setColor("Random")
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()

        message.channel.send({embeds: [embed]});
    }
}