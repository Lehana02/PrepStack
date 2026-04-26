const isAdmin=async (req,res,next)=>{
    const pin=req.headers.pin
    if(!pin||pin!==process.env.ADMIN_PIN){
        return res.status(403).json({message:"Not authorized, Admins only"})
    }
    next()
}
export default isAdmin