import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import {Trivia} from "discord-gamecord"

export const command: CommandDefinition = {
    name: "trivia",
    description: "Play trivia",
    category: CommandCategories.MINIGAMES,
    execute: async (client, message, args) => {
        const Game = new Trivia({
            message: message,
            isSlashGame: false,
            embed: {
              title: 'Trivia',
              color: '#5865F2',
              description: 'You have 60 seconds to guess the answer.'
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            trueButtonStyle: 'SUCCESS',
            falseButtonStyle: 'DANGER',
            mode: 'multiple',  // multiple || single
            difficulty: 'medium',  // easy || medium || hard
            winMessage: 'You won! The correct answer is {answer}.',
            loseMessage: 'You lost! The correct answer is {answer}.',
            errMessage: 'Unable to fetch question data! Please try again.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            return;
          });
    }
}