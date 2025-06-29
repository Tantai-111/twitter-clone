import express from "express";
import authRouters from "./routes/auth.routes.js"
import userRouters from "./routes/user.routes.js"
import postRouters from "./routes/post.routes.js"
import notificationRoutes from "./routes/notification.routes.js"
import dotenv from "dotenv"
import connectMangoDB from "./db/connectMondoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.use("/api/auth", authRouters)
app.use("/api/users", userRouters)
app.use("/api/posts", postRouters)
app.use("/api/notifications", notificationRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

console.log("Serving static files from:", path.join(__dirname, "/frontend/dist"));
console.log("NODE_ENV:", process.env.NODE_ENV);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectMangoDB();
})