import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import {EmbedBuilder} from "discord.js";
const BitlyClient = require("bitly").BitlyClient;

const bitly = new BitlyClient("050f52e0d6704c873f291ed918ed6a0c5b0cbe69");

export const command: CommandDefinition = {
    name: "shortenlink",
    description: "Shorten a link using the bitly API",
    category: CommandCategories.GENERAL,
    aliases: ["shlink"],
    permissions: ["ManageMessages"],
    execute: async (client, message, args) => {
        let link = args.slice(0).join(" ");

        if (!link) return message.reply({
            embeds:
                [new EmbedBuilder().setColor("Red").setTitle("Bitly Error | Missing Query")
                    .setDescription("You must provide a link to shorten")]
        })

        const embed = new EmbedBuilder();

        try {
            if (!link.match(/^(http:\/\/.|https:\/\/.|http:\/\/|https:\/\/)/)) {
              link = "https://" + link;
            }
            if (
              link.match(
                /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
              )
            ) {
              let result;
              try {
                result = await bitly.shorten(link);
              } catch (e) {
                throw e;
              }
              return message.reply({
                embeds: [
                  embed
                    .setTitle(`${message.author.username} - Bitly Link Shortener`)
                    .setDescription(`Old link: ${link}\nNew link: ${result.link}`)
                    .setColor("Blue")
                    .setTimestamp(),
                ],
              });
            } else {
              return message.reply({
                embeds: [embed.setColor("Red").setDescription("`INVALID LINK`")],
              });
            }
          } catch (err) {
            console.log(err);
            message.reply({
              embeds: [
                embed
                  .setColor("Red")
                  .setTitle("An error has occured!")
                  .setDescription(
                    "Try to add `https://` and `www.` before the link. If the issue persists, please contact the developer."
                  ),
              ],
            });
          }
    }
}