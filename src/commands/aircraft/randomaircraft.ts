import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder } from "discord.js";
import ConfigJson from "../../config.json";
import GphApiClient from "giphy-js-sdk-core";

const giphy = GphApiClient(ConfigJson.GIPHY_API_KEY);

export const command: CommandDefinition = {
    name: "randomaircraft",
    description: "Generate a random aircraft",
    category: CommandCategories.AIRCRAFT,
    aliases: ["ra"],
    execute: async (client, message, args) => {
        giphy.search("gifs", { q: "aircraft" }).then(response => {
            const randomResult = response.data[Math.floor(Math.random() * response.data.length)];
            const aircraftEmbed = new EmbedBuilder()
                .setTitle("Randomly Generated Aircraft ")
                .setImage(randomResult.images.original.url)
                .setColor("#2091eb");
            message.channel.send({ embeds: [aircraftEmbed] });
        })
    }
}