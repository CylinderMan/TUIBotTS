import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } from 'discord.js';


export const command: CommandDefinition = {
    name: "link",
    description: "Sends the private server link",
    category: CommandCategories.COMMUNITY,
    permissions: ["ManageMessages"],
    execute: async (client, message, args) => {
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Link")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://www.roblox.com/games/20321167?privateServerLinkCode=48103280894279513262750703192763")
            );

        const embed = new EmbedBuilder()
            .setTitle("Private Server Link")
            .setColor("#2091eb")
            .setDescription(`Click the button below to access the private server`)

        await message.reply({ content: 'Do not copy.', components: [row], embeds: [embed] });
    }
}