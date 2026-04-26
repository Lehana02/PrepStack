import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import resourceRouter from './routes/resources.route.js'
import cookieParser from 'cookie-parser'
import taskRouter from './routes/task.routes.js'
import { Server } from 'socket.io'
import { socketHandler } from './socket.js'

dotenv.config()

const app=express()
const server=http.createServer(app)

const io=new Server(server,{
    cors:{
    origin:"http://localhost:5173",
    credentials: true,
    methods:['POST','GET']
}
})

app.set("io",io)

const port=process.env.PORT || 5000

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/resources",resourceRouter)
app.use("/api/task",taskRouter)

socketHandler(io)

const startServer=async ()=>{
    try{
        await connectDb()
        console.log("DB connected successfully")
        server.listen(port,()=>{
            console.log(`Server started at ${port}`)
        })
    }catch (error){
        console.log("Failed to start server:", error)
        process.exit(1)
    }
}
startServer()