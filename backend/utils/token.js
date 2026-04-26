import jwt from "jsonwebtoken"

const genToken= (userId)=>{
    try{
        const token=jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    }catch(err){
        console.log("Token generation failed:", err)
        throw new Error("Token generation failed")
    }
}

export default genToken