import Notification from "../models/notification.model.js"

export const getNotifications = async (req,res) => {
    try {
        const userId = req.user._id

        const notifications = await Notification.find({to:userId}).populate({
            path: "from",
            select:"username profileImg"
        })

        await Notification.updateMany({to:userId}, {read:true})
        res.status(200).json(notifications)
    } catch (error) {
        console.log("Error in getNotifications: ", error.message)
        res.status(500).json("Internal server error")
    }
}

export const deleteNotifications = async (req,res) => {
    try {
        const userId = req.user._id

        await Notification.deleteMany({to: userId})

        res.status(200).json({message: "Notifications deleted successsfully"})
    } catch (error) {
        console.log("Error in deleteNotifications: ", error.message)
        res.status(500).json("Internal server error")
    }
}