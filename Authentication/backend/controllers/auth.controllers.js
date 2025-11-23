import { asyncWrapProviders } from "async_hooks"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signUp = async (req, res) => {
    try {
        const{firstName, lastName, email, userName, password} = req.body

        if(!firstName || !lastName || !email || !userName || !password){
            return res.status(400).json({message: "send all details"})
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
            password: hassedpassword
        })
        return res.status(201).json({user: {
            firstName,
            lastName,
            email, 
            userName, 
        }})

    } catch (error) {
        return res.status(500).json({message: "internal server error"})
    }
}
