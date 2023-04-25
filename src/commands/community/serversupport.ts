import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "serversupport",
    description: "Guide members on the private server issue.",
    aliases: ["private"],
    category: CommandCategories.COMMUNITY,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
        .setTitle("Private Server Link Is Invalid ")
        .setColor("Blue")
        .setDescription(`If you are experiencing issues joining the private server, follow these steps: \n1. Go to the top right corner of your Roblox home page. \n2. Click on the settings icon > Privacy > Other Settings. \n3. Ensure that "Who can invite me to private servers?" is set to "Everyone". \n\n**If you are still experiencing issues with joining the server, this is either a Roblox sided issue OR your account is 13>.**`)
        .setImage(`https://media.discordapp.net/attachments/1090659991339409558/1093934943815618711/privateserverinfo.png`)
        .setFooter({text: `Tip: Click the image to view in full size`})

        message.reply({embeds: [embed]});
    }
}