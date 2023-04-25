import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
import {Snake} from "discord-gamecord"

export const command: CommandDefinition = {
    name: "snake",
    description: "Play snake",
    category: CommandCategories.MINIGAMES,
    execute: async (client, message, args) => {
        const Game = new Snake({
            message: message,
            isSlashGame: false,
            embed: {
              title: 'Snake Game',
              overTitle: 'Game Over',
              color: '#2091eb'
            },
            emojis: {
              board: '⬛',
              food: '🍎',
              up: '⬆️', 
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            stopButton: 'Stop',
            timeoutTime: 60000,
            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            return;
          });
    }
}