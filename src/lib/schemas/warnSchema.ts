import {model, Schema} from "mongoose";

const warningSchema = new Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array
});

module.exports = model("tuiWarnings", warningSchema);