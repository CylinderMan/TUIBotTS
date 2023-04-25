import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder } from "discord.js";
import ConfigJson from "../../config.json";

const API_ERROR = 'API ERROR';
const API_KEY = ConfigJson.aviation_stack_api_key;

export const command: CommandDefinition = {
    name: "flightinfo",
    description: "Check a nearby flight",
    category: CommandCategories.AIRCRAFT,
    aliases: ["flight"],
    execute: async (client, message, args) => {
        const flight = args.slice(0).join(" ");
        if (!flight) return message.reply({embeds: [new EmbedBuilder().setColor("Red").setTitle("Flight Error | Missing Query").setDescription("You must provide a valid flight number.")]})

        const response = await getFlightInfo(flight);
        await message.reply(response);
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
   
  async function getFlightInfo(flightNumber) {
    const response = await getJson(`http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`, {});

    if (!response.success) return API_ERROR;
   
    const json = response.data;
    if (json.pagination.total === 0) return `No flight found matching ${flightNumber}`;
   
    const flightData = json.data[0];
    //console.log(json);
    const embed = new EmbedBuilder()
      .setTitle(`Click here for Live Map `)
      .setColor('Blue')
      .setURL(`https://planefinder.net/flight/${flightData.flight.icao}`)
      .setDescription(`Information of flight ${flightData.flight.iata} from ${flightData.departure.airport} to ${flightData.arrival.airport}.\n\n#️⃣ **Flight Number**: ${flightData.flight.iata}\n📟 **Callsign**: ${flightData.flight.icao ? flightData.flight.icao : 'N/A'}\n✈️ **Aircraft**: ${flightData.aircraft ? flightData.aircraft.icao : 'N/A'}\n👨‍✈️ **Airline**: ${flightData.airline.name +"\n\n" ? flightData.airline.name.toString() +"\n\n" : 'N/A'}\n\n`)
      //.setDescription(`Here is the information about flight ${flightData.flight.iata} from ${flightData.departure.airport} to ${flightData.arrival.airport}.\nFlight Number: ${flightData.flight.iata}\nAirline: ${flightData.airline.name}` ? `${flightData.airline.name.toString()}` : `'N/A' `)
      .addFields(
          //{ name: "ℹ️ Flight Informations", value: " "},
          //{ name: 'Flight Number', value: flightData.flight.iata ? flightData.flight.iata.toString() : 'N/A', inline: true  },
          //{ name: 'Airline', value: flightData.airline.name ? flightData.airline.name.toString() : 'N/A', inline: true  },
          //{ name: "\n", value: " "},
          { name: "🛫 Departure Information", value: " "},
          //{ name: 'Departure Airport', value: flightData.departure.icao ? flightData.departure.icao.toString() : 'N/A' - flightData.departure.airport ? flightData.departure.airport.toString() : 'N/A', inline: true  },
          { name: 'Departure Airport', value: flightData.departure.airport ? flightData.departure.airport.toString() : 'N/A', inline: true  },
          { name: 'Departure ICAO', value: flightData.departure.icao ? flightData.departure.icao.toString() : 'N/A', inline: true  },
          { name: 'Departure Terminal', value: flightData.departure.terminal ? flightData.departure.terminal.toString() : 'N/A', inline: true  },
          { name: 'Departure Gate', value: flightData.departure.gate ? flightData.departure.gate.toString() : 'N/A', inline: true  },
          { name: 'Departure Delay', value: flightData.departure.delay ? flightData.departure.delay.toString() : 'N/A', inline: true  },
          { name: 'Departure Time', value: flightData.departure.scheduled ? flightData.departure.scheduled.toString() : 'N/A', inline: true  },
          { name: "\n", value: " "},
          { name: "🛬 Arrival Information", value: " "},
          //{ name: 'Arrival Airport', value: flightData.arrival.icao ? flightData.arrival.icao.toString() : 'N/A' - flightData.arrival.airport ? flightData.arrival.airport.toString() : 'N/A', inline: true  },
          { name: 'Arrival Airport', value: flightData.arrival.airport ? flightData.arrival.airport.toString() : 'N/A', inline: true  },
          { name: 'Arrival ICAO', value: flightData.arrival.icao ? flightData.arrival.icao.toString() : 'N/A', inline: true  },
          { name: 'Arrival Terminal', value: flightData.arrival.terminal ? flightData.arrival.terminal.toString() : 'N/A', inline: true  },
          { name: 'Arrival Gate', value: flightData.arrival.gate ? flightData.arrival.gate.toString() : 'N/A', inline: true  },
          { name: 'Baggage after Arrival', value: flightData.arrival.baggage ? flightData.arrival.baggage.toString() : 'N/A', inline: true  },
          { name: 'Arrival Delay', value: flightData.arrival.delay ? flightData.arrival.delay.toString() : 'N/A', inline: true  },
          { name: 'Arrival Time', value: flightData.arrival.scheduled ? flightData.arrival.scheduled.toString() : 'N/A', inline: true  },
          { name: "\n", value: " "},        
          { name: "✈️ Flight Status", value: flightData.flight_status.toString() === 'active' ? 'On Time' : 'Not Active'},
          //{ name: 'Flight Status', value: flightData.flight_status.toString() === 'active' ? 'On Time' : 'Not Active', inline: true  },
          { name: 'Live Data Updated', value: flightData.live ? (flightData.live.updated ? flightData.live.updated.toString() : 'N/A') : 'N/A', inline: true  },
          { name: 'Latitude', value: flightData.live ? (flightData.live.latitude ? flightData.live.latitude.toString() : 'N/A') : 'N/A', inline: true  },
          { name: 'Longitude', value: flightData.live ? (flightData.live.longitude ? flightData.live.longitude.toString() : 'N/A') : 'N/A', inline: true  },
          { name: 'Altitude', value: flightData.live ? (flightData.live.altitude ? flightData.live.altitude.toString() : 'N/A') : 'N/A', inline: true  },
          { name: 'Direction', value: flightData.live ? (flightData.live.direction ? flightData.live.direction.toString() : 'N/A') : 'N/A', inline: true  },
          { name: 'Speed', value: flightData.live ? (flightData.live.speed_horizontal ? flightData.live.speed_horizontal.toString() : 'N/A') : 'N/A', inline: true  },
          { name: 'VS', value: flightData.live && flightData.live.speed_vertical ? flightData.live.speed_vertical.toString() : 'N/A', inline: true  },
      )
      .setTimestamp()
      .setFooter({ text: 'Real-Time Flight Information'});
   
    return { embeds: [embed] };
  }