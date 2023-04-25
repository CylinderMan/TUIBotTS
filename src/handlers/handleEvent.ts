import Client from "../lib/typeCommand";
import {ClientEvents} from "discord.js";

interface execute {
    (client: Client, ...args: any[])
}

export interface Event {
    name: keyof ClientEvents,
    execute: execute;
}