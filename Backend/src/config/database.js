const mongoose = require("mongoose")



async function connectToDB() {

    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined in environment variables")
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database")
    }
    catch (err) {
        console.error("Database connection error:", err.message)
    }
}

module.exports = connectToDB