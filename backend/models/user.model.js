import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,  
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["user"],
        default:"user",
        required:true
    },
    tasks:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    },
    socketId:{
        type:String
    },
    isOnline:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

const User=mongoose.model("User",userSchema)
export default User