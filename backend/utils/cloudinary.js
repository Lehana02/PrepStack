import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import streamifier from 'streamifier'

const uploadOnCloudinary = async (localfilePath, resourceType) => {
    
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
    const folderMap = {
        notes: "study-materials/notes",
        books: "study-materials/books",
        pyq: "study-materials/pyq"
    };

    const folderName = folderMap[resourceType] || "study-materials/others";

    try {
        if (!localfilePath || !resourceType) {
            throw new Error("Missing file or resource type")
        }
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: "image",
            folder: folderName,
            type: "upload" ,
            format: 'pdf'
        })

        if (fs.existsSync(localfilePath)) {
            fs.unlinkSync(localfilePath);
        }
        return response.public_id
    } catch (error) {
        if (fs.existsSync(localfilePath)) {
            fs.unlinkSync(localfilePath);
        }

        throw error
    }
}

export default uploadOnCloudinary