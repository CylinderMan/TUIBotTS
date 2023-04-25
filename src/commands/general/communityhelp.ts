import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "community",
    description: "See the community help commands",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
       .setTitle("Community")
       .setColor(`#2091eb`)
       .addFields(
        {name: ".advertisements", value: "Guide members on advertisements `.advertisements`"},
        {name: ".apply", value: "Guide members on how to apply `.apply`"},
        {name: ".denied", value: "Let members know why they got denied `.denied`"},
        {name: ".faq", value: "FAQ channel `.faq`"},
        {name: ".link", value: "Shows the private server link `.link`"},
        {name: ".rules", value: "Takes you to the rules channel `.rules`"},
        {name: ".support", value: "Takes you to the support channel `.support`"},
        {name: ".when", value: "Explain the flight schedule `.when`"},
        {name: ".serversupport", value: "Guide members if the server link is invalid `.serversupport`"},
       )

        message.channel.send({embeds: [embed]});
    }
}