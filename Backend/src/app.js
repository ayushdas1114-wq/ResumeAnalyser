const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",
    "https://resume-analyser-blush.vercel.app",
    process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            callback(null, true)
        } else {
            callback(null, true)
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}))

// Fast-fail if database is disconnected to avoid 10s buffering timeout
app.use((req, res, next) => {
    if (req.path === "/health") return next()
    if (mongoose.connection.readyState === 0) {
        return res.status(503).json({
            message: "Database is not connected. If using MongoDB Atlas, verify your cluster is running/unpaused or check your MONGO_URI in .env."
        })
    }
    next()
})

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is alive",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* global error handling middleware */
app.use((err, req, res, next) => {
    console.error("Global error handler caught:", err)
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
        error: err.message
    })
})

module.exports = app