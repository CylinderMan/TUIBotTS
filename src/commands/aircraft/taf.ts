import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import ConfigJson from "../../config.json";
import axios from "axios";

export const command: CommandDefinition = {
    name: "taf",
    description: "Provides the TAF report of the requested airport",
    category: CommandCategories.AIRCRAFT,
    execute: async (client, message, args) => {
        const icao = args[0];

        if (!icao) return message.reply({embeds: [new EmbedBuilder().setColor("Red").setTitle("TAF Error | Missing Query").setDescription("You must provide a valid airport code")]})

        try {
            const response = await axios.get(
                `https://avwx.rest/api/taf/${icao}?options=info`,
                {
                    headers: { Authorization: ConfigJson.AVWX_API_KEY },
                }
            );
            const { raw, station } = response.data;

            const embed = new EmbedBuilder()
            .setTitle(`${icao} | TAF`)
            .setColor("Blue")
            .setDescription(`**Raw report for ${station}**: ${raw}`)

            message.reply({embeds: [embed]});
        } catch (error) {
            message.channel.send('Invalid ICAO code!');
        }
    }
}