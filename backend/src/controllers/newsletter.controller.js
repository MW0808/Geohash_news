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
        try {
            console.log(reportedLocations)
            for (let i = 0; i < refinedLocation.length; i++){
                console.log(refinedLocation[i])
                const {geohash} = location[i];
                const neighborhood = Geohash.neighbours(geohash);
                const nearbyReports = await Report.find({
                $or: [
                    {location: {$in: [...Object.values(neighborhood)]}},
                    {location: geohash}
                ]
                // send nearby reports to Richard
            });
            }
            
            // console.log(nearbyReports);
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}