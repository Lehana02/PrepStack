import express from 'express'
import { signIn, googleAuth, logOut, signUp } from '../controllers/auth.controllers.js'

const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.post("/google-auth",googleAuth)
authRouter.get("/logout",logOut)

export default authRouter