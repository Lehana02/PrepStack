import mongoose from "mongoose";

const resourceSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true,
        trim:true
    },
    topic:{
        type:String,
        trim:true
    },
    year:{
        type:String,
        trim:true
    },
    resource:{
        type:String,
        required:true,
        trim:true
    },
    path:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    downloads:{
        type:Number,
        default:0
    },
    fileName:{
        type:String,
        required:true
    }
},{timestamps:true})   
    
const Resource=mongoose.model("Resource",resourceSchema)
export default Resource