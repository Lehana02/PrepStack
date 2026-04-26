import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import genToken from "../utils/token.js"

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        return res.status(200).json({ message: "Logged out successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json(`Sign out error ${error}`)
    }
}

export const signUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        })
        const token = await genToken(newUser._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(newUser)
    } catch (err) {
        return res.status(500).json(`Sign up error ${err}`)
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" })
        }
        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.status(200).json(user)
    }
    catch (err) {
        return res.status(500).json(`Sign in error ${err}`)
    }
}

export const googleAuth=async(req,res)=>{
    try{
        const {fullName,email}=req.body
        let user=await User.findOne({email})
        if(!user){
            user=await User.create({fullName,email})
        }
        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.status(200).json(user)
    }catch(err){
        return res.status(500).json(`Google auth error ${err}`)     
    }
}