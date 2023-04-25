import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import axios from "axios";

export const command: CommandDefinition = {
    name: "cat",
    description: "Generate a cat",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        try {
            const response = await axios.get('https://some-random-api.ml/img/cat');
            const catPic = response.data.link;
            
            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle('Random Cat Picture')
                .setImage(catPic)
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while fetching cat picture data.');
        }
    }
}