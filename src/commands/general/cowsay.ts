import { CommandDefinition, CommandCategories } from "../../handlers/handleCommand";
import { EmbedBuilder } from "discord.js";
import cowsay from "cowsay";

export const command: CommandDefinition = {
    name: "cowsay",
    description: "What does the cow say?",
    category: CommandCategories.GENERAL,
    execute: async (client, message, args) => {
        const say = args.slice(0).join(" ");

        if (!say) return message.reply({embeds: [new EmbedBuilder().setColor("Red").setTitle("Cowsay Error | Missing Query").setDescription("You must provide something for the cow to say")]})

        const cowText = cowsay.say({
            text: say,
            e: 'oO',
            T: 'U'
          });
      
        message.channel.send(`\`\`\`${cowText}\`\`\``);
    }
}