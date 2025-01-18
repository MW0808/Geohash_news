import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        auth0Id: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true,
            default: 0
        },
        streak: {
            type: Number,
            required: true,
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