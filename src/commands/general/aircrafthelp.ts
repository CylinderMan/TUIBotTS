import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "aircrafthelp",
    description: "See the aircraft help commands",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
       .setTitle("Aircraft")
       .setColor(`#2091eb`)
       .addFields(
        {name: ".metar", value: "Displays the metar of a given airport `.metar <Airport Code>`"},
        {name: ".simbrief", value: "Takes you to the dispatch page of Simbrief `.simbrief`"},
        {name: ".taf", value: "Displays the TAF of a given airport `.taf <airport>`"},
        {name: ".station", value: "Displays the station information of a given airport `.station <airport>`"},
        {name: ".generate-squawk", value: "Generate a squawk! `.generate-squawk`"},
        {name: ".flight", value: "Check the information of a nearby flight `.flight <callsign>`"},
       )

        message.channel.send({embeds: [embed]});
    }
}