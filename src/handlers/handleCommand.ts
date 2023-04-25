import Client from "../lib/typeCommand";
import {Message, PermissionsString} from "discord.js";

interface execute {
    (client: Client, message: Message, args: String[])
}

export const enum CommandCategories {
    AIRCRAFT = 'Aircraft',
    GENERAL = 'General',
    MEMES = 'Memes',
    MODERATION = 'Moderation',
    MINIGAMES = 'Minigames',
    COMMUNITY = "Community"
}

export interface CommandDefinition {
    name: string,
    description: string,
    category: CommandCategories,
    permissions?: PermissionsString[],
    aliases?: string[],
    execute: execute
}