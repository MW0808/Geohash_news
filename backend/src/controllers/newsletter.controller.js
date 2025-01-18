import Newsletter from "../models/newsletter.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";
import Report from "../models/report.model.js";

export const sendNewsletter = async () => {
    try {
        //Below is the testing data
        const title = "Daily Newsletter";
        const content = "Here’s the content of the newsletter.";
        const images = [];  // Replace with actual image paths
        const score = 90;

        let imageUrls = [];
            if (images) {
                for(let image of images){
                    try{
                        const uploadResponse = await cloudinary.uploader.upload(image);
                        imageUrls.push(uploadResponse.secure_url);
                    }
                    catch(error){
                        console.log(error)
                    }
                }  
            }

        const newLetter = new Newsletter({
                title,
                content, 
                images: imageUrls,
                score
            });
        
        await newLetter.save();
    } catch (error) {
        console.log(error)
    }
}

export const generateNewsletter = async () => {
    try {
        const reportedLocations = await Report.distinct("location");
        const refinedLocation =  await reportedLocations.filter(location => location.score >= 0);
        //loop through the refinedLocations and generate newsletters for them and their neighborhood (refer to getReports in reports 
        // controller for this implementation)

        //in each iteration, we call the function Richard is working on to actually generate it, we get it returned here and then call the saveNewsletter 
        //function with it
    } catch (error) {
        console.log(error);
    }
}