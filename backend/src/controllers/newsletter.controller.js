import Newsletter from "../models/newsletter.model.js";
import cloudinary from "../lib/cloudinary.js";

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