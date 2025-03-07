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
        score: {
            type: Number,
            default: 0
        },
        image: {
            type: String,
            default: ""
        },
        posterId: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

const Report = mongoose.model("Report", reportSchema);

export default Report;