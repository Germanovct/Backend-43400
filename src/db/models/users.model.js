
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true , unique: true},
    password: { type: String, required: true },
})

export const userModel = mongoose.model("Users", usersSchema)
