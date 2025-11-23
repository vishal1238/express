import express, { Router } from "express"
import { home } from "../Controllers/user.controllers.js";
import { create } from "domain";

// import express from "express"
let userRouter = Router();

userRouter.get("/", home)
 

//CURD Operations

// CREATE
userRouter.post("/create", create)

//READ
userRouter.get("/read",async(req, res) => {
    try {
        const users = await User.find({$and: [{age: {$gt: 30}},{name: {$ne: "Vishal"}}]}) // remove this when you want full data from the document
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({message: "user not found"}) 
    }
})

userRouter.get("/read/:userName",async(req, res) => {
    try {
        const users = await User.findOne({userName:req.params.userName})
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({message: "user not found"})
    }
})

//UPDATE

//findByIdAndUpdate

userRouter.put("/update/:id", async(req, res) => {
    try {
        let {name,age} = req.body
        let id = req.params.id
        let users = await User.findByIdAndUpdate(id,{name,age},{new: true})
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({message: "user not found"}) 
    }
})

// updateOne
userRouter.put("/update", async(req, res) => {
    try {
        let {name,age,email} = req.body
        let users = await User.updateOne({email},{name,age},{new: true})
        return res.status(200).json({message: "user Updated"})
    } catch (error) {
        return res.status(400).json({message: "user not found"}) 
    }
})

//DELETE
userRouter.delete("/delete/:id", async(req, res) => {
    try {
        let id = req.params.id
        let user = await User.findByIdAndDelete(id)
        return res.status(200).json({message: "user Deleted"})
    } catch (error) {
        return res.status(400).json({message: "user not found"})
    }
})

export default userRouter