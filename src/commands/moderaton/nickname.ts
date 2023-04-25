import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder } from "discord.js";

export const command: CommandDefinition = {
    name: "nickname",
    description: "Give someone a nickname",
    category: CommandCategories.MODERATION,
    aliases: ["nick"],
    permissions: ["ManageMessages"],
    execute: async (client, message, args) => {
        const user = message.mentions.members?.first();
        if (!user) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Nickname Error | Missing Query")
                    .setDescription("Please provide a user to change their nickname ")]
        })

        const name = args.slice(1).join(" ") || "No nickname provided"

        if(!user.kickable) return message.reply("I cannot change this user's nickname!");

        user.setNickname(name).catch(err => {console.log("There was an error changing this user's nickname")});

        message.channel.send(`Nickname set to \`${name}\`.`);
    }
}