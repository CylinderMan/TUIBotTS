import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";

export const command: CommandDefinition = {
    name: "tweet",
    description: "Send a fake tweet",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const tweet = args.slice(0).join(" ");

        if (!tweet) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Tweet Error | Missing Query")
                    .setDescription("You must provide something to tweet")]
        })

        let avatarUrl = message.author.avatarURL({ extension: "jpg" });
        let canvas = `https://some-random-api.ml/canvas/tweet?avatar=${avatarUrl}&displayname=${
          message.author.username
        }&username=${message.author.username}&comment=${encodeURIComponent(
          tweet
        )}`;
    
        const embed = new EmbedBuilder()
          .setTitle("Fake Tweet!")
          .setImage(canvas)
          .setTimestamp()
          .setColor("Random");
    
        await message.channel.send({
          embeds: [embed],
        });
    }
}