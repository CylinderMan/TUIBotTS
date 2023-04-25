import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder } from "discord.js";

export const command: CommandDefinition = {
    name: "invites",
    description: "Check your invites",
    category: CommandCategories.MODERATION,
    permissions: ["ManageMessages"],
    execute: async (client, message, args) => {
        const user = message.mentions.users.first()
        if (!user) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Invites Error | Missing Query")
                    .setDescription("Please provide a user to check their invites")]
        })

        let invites = await message.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);

        let i = 0;
        userInv.forEach(inv => i += inv.uses);

        const embed = new EmbedBuilder()
            .setColor(`#073590`)
            .setDescription(`${user.tag} has **${i}** invites`)

        message.channel.send({ embeds: [embed] });
    }
}