const mongoose = require("mongoose")



async function connectToDB() {

    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined in environment variables")
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database")
        
        // Attempt to drop the unique username index if it exists from previous deployments
        try {
            await mongoose.connection.collection('users').dropIndex('username_1')
            console.log("Dropped legacy unique username index")
        } catch (indexErr) {
            // Ignore if index doesn't exist
        }
    }
    catch (err) {
        console.error("Database connection error:", err.message)
    }
}

module.exports = connectToDB