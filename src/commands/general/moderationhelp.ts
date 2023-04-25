import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "moderationhelp",
    description: "See the moderation help commands",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
        .setTitle("Moderation")
        .setColor(`#2091eb`)
        .addFields(
         {name: ".ban", value: "Ban a user from the server `.ban <@user> <reason>`"},
         {name: ".chatgpt", value: "Ask ChatGPT a question (responses can be slow) `.chatgpt <question>`"},
         {name: ".clearwarns", value: "Clear a user's warnings `.clearwarns <@user>`"},
         {name: ".invites", value: "Check a user's invites `.invites <@user>`"},
         {name: ".kick", value: "Kick a user from the server `.kick <@user> <reason>`"},
         {name: ".lock", value: "Lock a channel in the server `.lock <#channel> <reason>`"},
         {name: ".mute", value: "Mute a user in the server `.mute <@user> <time>(1m, 1h, 2d) <reason>`"},
         {name: ".nickname", value: "Give someone a nickname `.nickname <@user> <name>`"},
         {name: ".purge", value: "Clear a number of messages in a channel `.purge <number>`"},
         {name: ".say", value: "Make the bot say something `.say <text>`"},
         {name: ".slowmode", value: "Set the slowmode on a channel `.slowmode <seconds>`"},
         {name: ".unlock", value: "Unlock a channel in the server `.unlock <#channel> <reason>`"},
         {name: ".unmute", value: "Unmute a user in the server `.unmute <@user>`"},
         {name: ".warn", value: "Warn a user in the server `.warn <@user> <reason>`"},
         {name: ".warnings", value: "Check a user's warnings in the server `.warnings <@user>`"},
        )
 
         message.channel.send({embeds: [embed]});
    }
}