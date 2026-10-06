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
        if (err.message && err.message.includes("ENOTFOUND")) {
            console.error("\n[MongoDB Atlas Tip]: Cluster domain not found.")
            console.error("1. Check if your MongoDB Atlas cluster is PAUSED (log into https://cloud.mongodb.com and click 'Resume').")
            console.error("2. If your cluster was recreated, update MONGO_URI in Backend/.env with the new connection string.\n")
        }
    }
}

module.exports = connectToDB