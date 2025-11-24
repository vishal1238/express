import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()


let app = express()

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // it will pass cookies
}));
app.use(cookieParser())

app.use("/api", authRouter)

app.listen(9000,() => {
    ConnectDB()
    console.log("Your sever is running at http://localhost:9000/");
})