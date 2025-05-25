import express from "express";
import authRouters from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectMangoDB from "./db/connectMondoDB.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.use("/api/auth", authRouters)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectMangoDB();
})