import express from "express";
import authRouters from "./routes/auth.routes.js"
import userRouters from "./routes/user.routes.js"
import dotenv from "dotenv"
import connectMangoDB from "./db/connectMondoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.use("/api/auth", authRouters)
app.use("/api/users", userRouters)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectMangoDB();
})