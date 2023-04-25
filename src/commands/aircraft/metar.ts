import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import ConfigJson from "../../config.json";

export const command: CommandDefinition = {
    name: "metar",
    description: "Provides the METAR report of the requested airport",
    category: CommandCategories.AIRCRAFT,
    execute: async (client, message, args) => {
        const icao = args[0];

        if (!icao) return message.reply({embeds: [new EmbedBuilder().setColor("Red").setTitle("Metar Error | Missing Query").setDescription("You must provide a valid airport ICAO code.")]})

        try {
            const metarReport = await fetch(`https://avwx.rest/api/metar/${icao}`, {
              method: 'GET',
              headers: { Authorization: ConfigJson.AVWX_API_KEY },
            }).then((res) => res.json());
      
            const embed = new EmbedBuilder()
              .setTitle(`Metar Report | ${metarReport.station}`)
              .setDescription(`**Raw Report**: ${metarReport.raw}`)
              .addFields(
                { name: "Time observed", value: `${metarReport.time.dt}` },
                { name: "Station", value: `${metarReport.station}` },
                { name: "Wind", value: `${metarReport.wind_direction.repr}${metarReport.wind_direction.repr === 'VRB' ? '' : '°'} at ${metarReport.wind_speed.repr} ${metarReport.units.wind_speed}` },
                { name: "Visibility", value: ` ${metarReport.visibility.repr} ${Number.isNaN(+metarReport.visibility.repr) ? '' : metarReport.units.visibility}` },
                { name: "Temperature", value: `${metarReport.temperature.repr}°` },
                { name: "Dew Point", value: `${metarReport.dewpoint.repr}°` },
                { name: "Altimeter", value: `${metarReport.altimeter.value.toString()} ${metarReport.units.altimeter}` },
                { name: "Flight Rules", value: `${metarReport.flight_rules}` },
              )
              .setTimestamp()
              .setColor("Blue")
      
              message.reply({embeds: [embed]});
          } catch (e) {
            console.log(e);
          }
    }
}