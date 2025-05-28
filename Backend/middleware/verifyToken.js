const UserModel = require("../model/UserModel")
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) =>{
    const token = req?.cookies?.token
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded) =>{
            try{
                if(err){
                    return res.status(200).json({error: "Token not Valid", success: false, message: "Invalid Credentials"})
                }
                else{
                    const user = await UserModel.findById({_id: decoded.id}).select("-password")
                    req.user = user
                    next()
                }
            }
            catch(err){
                console.log(`Error in User Verify Token - ${err.message}`)
                return res.status(200).json({message: 'Internal Server Error'})
            }
        })
    }
    else{
        return res.status(200).json({error: "Token Timed Out", success: false, message: "Invalid Credentials"})
    }
}

module.exports = verifyToken