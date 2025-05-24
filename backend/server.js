import express from "express";
import authRouters from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectMangoDB from "./db/connectMondoDB.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

console.log(process.env.MONGO_URI)

app.use("/api/auth", authRouters)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectMangoDB();
})