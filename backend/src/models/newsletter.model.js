import e from "express";
import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        }, 
        content: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        images: {
            type: [String]
        },
        score: {
            type: Number,
            required: true
        } 
    }, 
    {timestamps: true}  
);

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;

        


