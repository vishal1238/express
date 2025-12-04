import { asyncWrapProviders } from "async_hooks"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../config/token.js"
import strict from "assert/strict"
import uploadOnCloudinary from "../config/cloudinary.js"

export const signUp = async (req, res) => {
    try {
        const{firstName, lastName, email, userName, password} = req.body
        console.log(req.body);
        

        if(!firstName || !lastName || !email || !userName || !password){
            return res.status(400).json({message: "send all details"})
        }
        
        let profileImage;
        console.log(req.file);
        if(req.file){
            profileImage = await uploadOnCloudinary(req.file.path)
        }

        let existUser = await User.findOne({email})

        if(existUser){
            return res.status(400).json({message: "user already exist"})
        }
        //passsword hash
        const hassedpassword = await bcrypt.hash(password,10)

        const user = await User.create({
            firstName,
            lastName,
            email, 
            userName, 
            password: hassedpassword,
            profileImage
        })

        //token generate 
        let token;
        try {
            token = generateToken(user._id)
        } catch (error) {
            console.log(error);
            
        }
        
        // parse the token in cookies
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENVIRONMENT == "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })
        

        return res.status(201).json({user: {
            firstName,
            lastName,
            email, 
            userName,
            profileImage
        }})

    } catch (error) {
        return res.status(500).json({message: "internal server error"})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        let existUser = await User.findOne({email})
        if(!existUser){
            return res.status(400).json({message: "User does not exist"})
        }

        let match = await bcrypt.compare(password, existUser.password)

        if(!match){
            return res.status(400).json({message: "Incorrect password"})
        }

        //token generate 
        let token;
        try {
            token = generateToken(existUser._id)
        } catch (error) {
            console.log(error);
            
        }
        return res.status(201).json({user: {
            firstName:existUser.firstName,
            lastName: existUser.lastName,
            email: existUser.email,
            userName: existUser.userName
        }})

        // parse the token in cookies
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENVIRONMENT == "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })

    } catch (error) {
        return res.status(500).json({message: "internal server error"})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "logout successfully"})

    } catch (error) {
        return res.status(500).json(error)
    }
}