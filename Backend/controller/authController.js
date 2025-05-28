const UserModel = require("../model/UserModel")
const bcrypt = require("bcrypt")
const jwtToken = require("../utils/jwtToken")
const cloudinary = require('cloudinary')

const signupController = async(req, res) =>{
    try{
        const { fullName, email, password } = req.body
        const profileImg = req?.files?.profileImg?.[0]

        const exist = await UserModel.findOne({email: email})
        if(exist){
            return res.status(200).json({success: false, message: "Email already Registered", exist})
        }

        let imageURL = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
        if(profileImg){
            let result = await cloudinary.v2.uploader.upload(profileImg.path, {resource_type: 'image'})
            imageURL = result.secure_url
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = UserModel({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            profileImg: imageURL
        })

        jwtToken(newUser.id, res)
        const {password: pass, ...user} = newUser._doc
        await newUser.save()
        return res.status(200).json({success: true, user: user, message: "Signup Success"})
    }
    catch(err){
        console.log(`Error in Sign Up Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

const loginController = async(req, res) =>{
    try{
        const { email, password } = req.body

        const exist = await UserModel.findOne({email: email})
        if(!exist){
            return res.status(200).json({success: false, message: "Email is not Registered"})
        }

        const verifyPassword = await bcrypt.compare(password, exist.password)
        if(!verifyPassword){
            return res.status(200).json({success: false, message: "Password is Wrong"})
        }

        jwtToken(exist.id, res)
        const {password: pass, ...user} = exist._doc
        return res.status(200).json({success: true, message: "Login Success", user: user})
    }
    catch(err){
        console.log(`Error in Login Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

const logoutController = async(req, res) =>{
    try{
        res.clearCookie("token", {
            sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
            secure: process.env.NODE_ENV !== "development"
        })
        return res.status(200).json({success: true, message: "Logout Success"})
    }
    catch(err){
        console.log(`Error in Logout Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

const verifyTokenController = async(req, res) =>{
    try{
        return res.status(200).json({success: true, user: req.user})
    }
    catch(err){
        console.log(`Error in Verify Token Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

module.exports = { signupController, loginController, logoutController, verifyTokenController }