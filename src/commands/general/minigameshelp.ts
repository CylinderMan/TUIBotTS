import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "minigameshelp",
    description: "See the minigames help commands",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const embed = new EmbedBuilder()
       .setTitle("Minigames")
       .setColor(`#2091eb`)
       .addFields(
        {name: ".connect4", value: "Play connect4 `.connect4 <@opponent>`"},
        {name: ".fastype", value: "Play fastype `.fastype`"},
        {name: ".hangman", value: "Play hangman `.hangman`"},
        {name: ".rockpaperscissors", value: "Play rock paper scissors `.rockpaperscissors <@opponent>`"},
        {name: ".snake", value: "Play snake `.snake`"},
        {name: ".tictactoe", value: "Play tic tac toe `.tictactoe <@opponent>`"},
        {name: ".trivia", value: "Answer random questions `.trivia`"},
        {name: ".wordle", value: "Play wordle `.wordle`"},
       )

        message.channel.send({embeds: [embed]});
    }
}