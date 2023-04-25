import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import {Wordle} from "discord-gamecord"

export const command: CommandDefinition = {
    name: "wordle",
    description: "Play wordle",
    category: CommandCategories.MINIGAMES,
    execute: async (client, message, args) => {
        const Game = new Wordle({
            message: message,
            isSlashGame: false,
            embed: {
                title: "Wordle",
                color: "#2091eb"
            },
            customWord: null,
            timeoutTime: 60000,
            winMessage: "You won! The word was **{word}**!",
            loseMessage: "You lost! The word was **{word}**!",
            playerOnlyMessage: "Only {player} can use these buttons",
        })

        Game.startGame();
        Game.on("gameOver", result => {
            return;
        })
    }
}