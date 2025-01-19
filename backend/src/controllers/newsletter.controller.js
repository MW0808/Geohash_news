import Newsletter from "../models/newsletter.model.js";
import cloudinary from "../lib/cloudinary.js";
import Report from "../models/report.model.js";
import Geohash from "latlon-geohash";
import User from "../models/user.model.js";
import { genNewsLetter } from "../lib/utils.js";

export const subscribeToNewsletter = async (req, res) => {
    const {lat, long} = req.query;
    const geohash = Geohash.encode(lat, long, 6);
    const {auth0Id} = req.body;
    try {
        const user = User.findOneAndUpdate(
            {auth0Id},
            {$push: {subscriptions: geohash}},
            {new: true}
        )
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

export const sendNewsletter = async (newsletterContent, locationHash, imagesArr) => {
    try {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const title = `Daily Digests (${month}.${day})`
        const content = newsletterContent;
        const images = imagesArr;
        const score = 0;
        const location = locationHash;

        // let imageUrls = [];
        //     if (images) {
        //         for(let image of images){
        //             try{
        //                 const uploadResponse = await cloudinary.uploader.upload(image);
        //                 imageUrls.push(uploadResponse.secure_url);
        //             }
        //             catch(error){
        //                 console.log(error)
        //             }
        //         }  
        //     }

        const newLetter = new Newsletter({
                title,
                content, 
                images,
                location,
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
            },
        }
        ]);

        for (let i = 0; i < results.length; i++) {
            const {_id: geohash} = results[i];
            const neighborhood = Geohash.neighbours(geohash);
            const nearbyReports = await Report.find({
                $or: [
                    {location: {$in: [...Object.values(neighborhood)]}},
                    {location: geohash}
                ]
            });
            const result = await genNewsLetter(nearbyReports);
            const imageArray = nearbyReports.map(nearbyReports => nearbyReports.image);
            sendNewsletter(result, results[i]._id, imageArray);
        }

    } catch (error) {
        console.log(error);
    }
}