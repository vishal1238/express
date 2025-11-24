import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(filePath) => {
    try {
        if(!filePath){
            return null
        }

        let result = cloudinary.uploader.upload()
        console.log(result);
        return result.secure_url

        fs.unlinkSync(filePath)

    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(error);
        
    }
}

export default uploadOnCloudinary