import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        upvote: {
            type: Number,
            default: 0
        },
        downvote: {
            type: Number,
            default: 0
        },
        image: {
            type: String,
            default: ""
        }
    },
    {timestamps: true}
);

const Report = mongoose.model("Report", reportSchema);

export default Report;