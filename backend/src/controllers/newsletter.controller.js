import Newsletter from "../models/newsletter.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";
import Report from "../models/report.model.js";
import Geohash from "latlon-geohash";

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

        const now = new Date();
        const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);

        const results = await Report.aggregate([
        {
            $match: {
            createdAt: { $gte: twentyFourHoursAgo },
            },
        },
        {
            $group: {
            _id: "$location",  
            totalScore: { $sum: "$score" },  
            count: { $sum: 1 }, 
            },
        }
        ]);

        for (let i = 0; i < results.length; i++) {
            console.log(results[i])
            const {_id: geohash} = results[i];
            const neighborhood = Geohash.neighbours(geohash);
            const nearbyReports = await Report.find({
                $or: [
                    {location: {$in: [...Object.values(neighborhood)]}},
                    {location: geohash}
                ]
                // send nearby reports to Richard
            });
        }


        // const reportedLocations = await Report.distinct("location");
        // const refinedLocation =  await reportedLocations.filter(location => location.score >= 0);
        //loop through the refinedLocations and generate newsletters for them and their neighborhood (refer to getReports in reports 
        // controller for this implementation)

    } catch (error) {
        console.log(error);
    }
}