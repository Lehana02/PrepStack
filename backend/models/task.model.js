import mongoose from 'mongoose'

const subTopicSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    durationDays:{
        type:Number,
        required:true,
        default:1,
        min:0
    },
    hoursPerDay:{
        type:Number,
        required:true,
        default:1,
        min:1,
        max:24
    },
    status:{
        type:String,
        enum:["pending","half","done"],
        default:"pending"
    }
})
const taskSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    subTopics:{
        type:[subTopicSchema],
        default:[]
    },
    status:{
        type:String,
        enum:["pending", "done"],
        default:"pending"
    }
},{timestamps:true})

const Task=mongoose.model("Task",taskSchema)
export default Task