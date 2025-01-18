import Report from "../models/report.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import Geohash from "latlon-geohash";

// export  const getReports = async (req, res) => {
//     const {lat, long} = req.query;
    
// };
export const getGeohash = async (req, res) => {
    const {lat, long} = req.query;
    const geohash = Geohash.encode(lat, long, 6);
    res.status(200).json(geohash);
};

export const sendReport = async (req, res) => {
    try {
        const {title, location, description, image} = req.body;
    let imageUrl;
    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newReport = new Report({
        title,
        location,
        description,
        image: imageUrl
    });

    await newReport.save();

    res.status(201).json(newReport);
    } catch (error) {
        console.log(error)
    }

}

export const upvote async (req, res) => {
    try {
        //_id in req.body
        //use findoneandupdate in mongoose to find this _id and update the upvote count by + 1
    } catch (error) {
        
    }
}

// export const downvote