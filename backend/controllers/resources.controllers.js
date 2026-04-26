import Resource from "../models/resources.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import compressPDF from "../utils/compressPdf.js"

export const uploadFile=async (req,res)=>{
    try {
        const {subject,resource,topic,year}=req.body
        const pdfFile=req.file
        const uploadedBy=req.userId

        if(!pdfFile){
            return res.status(400).json({message:"PDF file is required"})
        }
        if(!subject || !resource){
            return res.status(400).json({message:"Subject, Resource and File Name are required"})
        }
        
        const cloudinaryUrl=await uploadOnCloudinary(pdfFile.path,resource)
        const newResource=new Resource({
            subject,
            resource,
            fileName:pdfFile.originalname,
            uploadedBy,
            path:cloudinaryUrl,
            year:year&&year.toString().trim()?year.toString().trim():"",
            topic:topic&&topic.trim()?topic.trim():""
        })
        await newResource.save()
        console.log("done4")
        return res.status(201).json({message:"File uploaded successfully",resource:newResource})
    } catch (error) {
        return res.status(500).json({message:"Error uploading file",error:error.message})
    }
}

export const getPyqs=async(req,res)=>{
    try{
        const pyqs=await Resource.find({resource:"pyq"})
        return res.status(200).json(pyqs)
    }catch(error){
        return res.status(500).json({message:`Get pyqs error ${error}`})
    }
}

export const getNotes=async(req,res)=>{
    try{
        const notes=await Resource.find({resource:"notes"})
        return res.status(200).json(notes)
    }catch(error){
        return res.status(500).json({message:`Get notes error ${error}`})
    }
}

export const getBooks=async(req,res)=>{
    try {
        const books=await Resource.find({resource:"books"})
        return res.status(200).json(books)
    } catch (error) {
        return res.status(500).json({message:`Get books error ${error}`})
    }
}

export const download=async (req,res)=>{
    try {
    const { resourceId } = req.body;

    const resource = await Resource.findOneAndUpdate(
      { _id: resourceId },        
      { $inc: { downloads: 1 } }, 
      { returnDocument: "after" }               
    );

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ message: "Download count updated", resource });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}