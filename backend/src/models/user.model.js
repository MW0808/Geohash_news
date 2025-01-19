import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            default: 0
        },
        streak: {
            type: Number,
            default: 0
        },
        lastPosted: {
            type: Date,
        },
        subscriptions: {
            type: [String]
        }
    }
);

const User = mongoose.model("User", userSchema);

export default User;