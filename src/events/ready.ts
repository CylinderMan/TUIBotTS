import {Event} from "../handlers";

export const event: Event = {
    name: "ready",
    execute: (client) => {
        console.log(`Logged in as ${client.user.tag}`)
    }
}