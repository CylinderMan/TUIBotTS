import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import ConfigJson from "../../config.json";

export const command: CommandDefinition = {
    name: "station",
    description: "Provides the station report of the requested airport",
    category: CommandCategories.AIRCRAFT,
    execute: async (client, message, args) => {
        const icao = args[0];

        if (!icao) return message.reply({embeds: [new EmbedBuilder().setColor("Red").setTitle("Station Error | Missing Query").setDescription("You must provide a valid airport code")]})

        try {
            const stationReport = await fetch(`https://avwx.rest/api/station/${icao}`, {
                method: 'GET',
                headers: { Authorization: ConfigJson.AVWX_API_KEY },
            }).then((res) => res.json());

            const runwayIdents = stationReport.runways.map((runways) => `**${runways.ident1}/${runways.ident2}:** `
            + `${runways.length_ft} ft x ${runways.width_ft} ft / `
            + `${Math.round(runways.length_ft * 0.3048)} m x ${Math.round(runways.width_ft * 0.3048)} m`);

            const embed = new EmbedBuilder()
            .setTitle(`Station Info | ${stationReport.icao}`)
            .setColor("Blue")
            .addFields(
                {name: "Name", value: `${stationReport.name}`},
                {name: "Country", value: `${stationReport.country}`},
                {name: "City", value: `${stationReport.city}`},
                {name: "Latitude", value: `${stationReport.latitude}°`},
                {name: "Longitude", value: `${stationReport.longitude}°`},
                {name: "Elevation", value: `${stationReport.elevation_m} m/${stationReport.elevation_ft} ft`},
                {name: "Runways (Ident1/Ident2: Length x Width):", value: `${runwayIdents.toString().replace(/,/g, '\n')}`},
                {name: "Type", value: `${stationReport.type.replace(/_/g, ' ')}`},
                {name: "Website", value: `${stationReport.website}`},
                {name: "Wiki", value: `${stationReport.wiki}`},
            )

            message.reply({embeds: [embed]});
        } catch (e) {
            console.log(e);
        }
    }
}