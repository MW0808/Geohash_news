import e from "express";
import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
            unique: true
        }, 
        reports: [{
            image : {
                type: String,
                default: ""
            },
            location : {
                type: String,
                required: true
            },
            title : {
                type: String,
                required: true
            },
            description : {
                type: String,
                required: true
            },
        }], 
    }, 
    {timestamps: true}  
);

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;

        


