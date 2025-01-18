import Report from "../models/report.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import Geohash from "latlon-geohash";
import User from "../models/user.model.js";

export const getGeohash = async (req, res) => {
    const {lat, long} = req.query;
    const geohash = Geohash.encode(lat, long, 6);
    res.status(200).json(geohash);
};

export const sendReport = async (req, res) => {
    try {
        const {title, location, description, image, posterId} = req.body;
    let imageUrl;

    
    
    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }
    
    
    const newReport = new Report({
        title,
        location,
        description,
        image: imageUrl,
        posterId
    });
    
    //streak functionality
    const {createdAt} = await newReport.save();
    const {lastPosted} = await User.findOne({auth0Id: posterId});

    const postDay = new Date(createdAt).setHours(0, 0, 0);
    const lastPost = new Date(lastPosted).setHours(0, 0, 0);

    if ((postDay - lastPost) === 24 * 60 * 60 * 1000) {
        await User.findOneAndUpdate(
            {auth0Id: posterId},
            {$inc: {score: 1}},
        )
    }

    if ((postDay - lastPost) >= 24 * 60 * 60 * 1000) {
        await User.findOneAndUpdate(
            {auth0Id: posterId},
            {$set: {score: 1}},
        )
    }
    
    res.status(201).json(newReport);
    } catch (error) {
        console.log(error)
    }

};

export const upvote = async (req, res) => {
    try {
        const {_id} = req.body;
        const updateDoc = await Report.findOneAndUpdate(
            {_id},
            {$inc:{score: 1}},
            {new: true}
        )

        const {posterId: auth0Id} = updateDoc;

        const updatedUser = await User.findOneAndUpdate(
            {auth0Id},
            {$inc:{score: 1}},
            {new: true}
        )

    
    res.status(200).json(updateDoc, updatedUser)
    } catch (error) {
        console.log(error)
    }
};

export const downvote = async (req, res) => {
    try {
        const {_id} = req.body;
        const updateDoc = await Report.findOneAndUpdate(
            {_id},
            {$inc:{score: -1}},
            {new: true}
        )

        const updatedUser = await User.findOneAndUpdate(
            {auth0Id},
            {$inc:{score: -1}},
            {new: true}
        )

        res.status(200).json(updateDoc, updatedUser)
    } catch (error) {
        console.log(error)
    }
};

export const getReports = async (req, res) => {
    try {
        const {geohash} = req.params;
        const neighborhood = Geohash.neighbours(geohash);
        const nearbyReports = await Report.find({
            $or: [
                {location: {$in: [...Object.values(neighborhood)]}},
                {location: geohash}
            ]
        });
        res.status(200).json(nearbyReports);
    } catch (error) {
        console.log(error);
    }
}