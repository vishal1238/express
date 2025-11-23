import express from "express"

import dotenv from "dotenv"
dotenv.config()
import ConnectDB from "./config/db.js"
import userRouter from "./routes/user.routes.js"

const app = express()


app.use(express.json())
app.use("/api",userRouter)



app.listen(9000, () => {
    ConnectDB()
    console.log('Server is running at http://localhost:9000/');
})
