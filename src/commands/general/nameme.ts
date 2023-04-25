import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";

export const command: CommandDefinition = {
    name: "nameme",
    description: "The bot gives a user a random name",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        let nicknames = ["Walter White", "Dream Stan", "Big Chungus", "Master of the Butters", "Gigachad", "Toxic Kid", "Fatherless bozo", "Donkey", "Troll", "Internet Addict", "I HOPE YOU REALISE THAT YOU ARE NO LONGER SAFE HAHAHHA", "do u kno da wae", "Saddo", "Genshin Impact Player", "Memer", "jam", "Depressed Child", "Edgy Emo"];
    message.channel.send(`${nicknames[Math.floor(Math.random()*nicknames.length)]} is your new name!`);
    }
}