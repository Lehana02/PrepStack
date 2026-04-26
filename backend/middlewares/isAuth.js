import jwt from "jsonwebtoken"

const isAuth=async (req,res,next)=>{
    try{
        const token=req.cookies?.token

        if(!token){
            console.log("Token not found")
            return res.status(401).json({message:"Token not found, Unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            console.log("Invalid token")
            return res.status(401).json({message:"Invalid token, Unauthorized"})
        }
        req.userId=decoded.id

        next()
    }catch(error){
        return res.status(500).json({message:`isAuth error ${error}`})
    }
}

export default isAuth