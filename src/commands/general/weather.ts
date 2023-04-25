import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import ConfigJson from "../../config.json";

const API_ERROR = "API ERROR";
const API_KEY = ConfigJson.WHSTK_API_KEY;

export const command: CommandDefinition = {
    name: "weather",
    description: "Provides the weather report of an area",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const place = args.slice(0).join(" ");
        const response = await weather(place);
        await message.reply(response);

        if (!place) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Weather Error | Missing Query")
                    .setDescription("You must provide a location")]
        })
    }
}

async function getJson(url, options) {
    try {
        const response = options ? await fetch(url, options) : await fetch(url);
        const json = await response.json();
        return {
            success: response.status === 200 ? true : false,
            status: response.status,
            data: json,
        };
    } catch (error) {
        console.error(error);
        return { success: false, error: error };
    }
}

async function weather(place) {
    const response = await getJson(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${place}`, {});
    if (!response.success) return API_ERROR;

    const json = response.data;
    if (!json.request) return `No city found matching \`${place}\``;

    const embed = new EmbedBuilder()
        .setTitle('Weather')
        .setColor('Blue')
        .setDescription(`Current weather at ${json.location?.name}`)
        .setThumbnail(json.current?.weather_icons[0])
        .addFields(
            { name: "City", value: json.location?.name || "NA", inline: true },
            { name: "Region", value: json.location?.region || "NA", inline: true },
            { name: "Country", value: json.location?.country || "NA", inline: true },
            { name: "Weather condition", value: json.current?.weather_descriptions[0] || "NA", inline: true },
            { name: "Date", value: json.location?.localtime.slice(0, 10) || "NA", inline: true },
            { name: "Time", value: json.location?.localtime.slice(11, 16) || "NA", inline: true },
            { name: "Temperature", value: `${json.current?.temperature}°C`, inline: true },
            { name: "CloudCover", value: `${json.current?.cloudcover}%`, inline: true },
            { name: "Wind Speed", value: `${json.current?.wind_speed} km/h`, inline: true },
            { name: "Wind Direction", value: json.current?.wind_dir || "NA", inline: true },
            { name: "Wind Degree", value: `${json.current?.wind_degree.toString()}°` || "NA", inline: true },
            { name: "Pressure", value: `${json.current?.pressure} mb`, inline: true },
            { name: "Precipitation", value: `${json.current?.precip.toString()} mm`, inline: true },
            { name: "Humidity", value: json.current?.humidity.toString() || "NA", inline: true },
            { name: "Visual Distance", value: `${json.current?.visibility} km`, inline: true },
            { name: "UV Index", value: json.current?.uv_index.toString() || "NA", inline: true }
        )
        //.setFooter(`Last checked at ${json.current?.observation_time} GMT`);
        .setFooter({ text: `Last checked at ${json.current?.observation_time} GMT` });

    return { embeds: [embed] };
}