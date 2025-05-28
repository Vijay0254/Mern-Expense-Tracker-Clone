const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./db/connectDb')
const connectCloudinary = require('./utils/connectCloudinary')

const authRouter = require("./router/authRouter")
const incomeRouter = require("./router/incomeRouter")
const expenseRouter = require("./router/expenseRouter")
const dashboardRouter = require("./router/dashboardRouter")

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigin = process.env.FRONTEND_URL;

        // Allow your main domain + all Vercel preview deployments
        if (!origin || origin === allowedOrigin || origin.endsWith(".vercel.app")){
            callback(null, true);
        } 
        else{
            callback(new Error("CORS not allowed for: " + origin));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", authRouter)
app.use("/api/income", incomeRouter)
app.use("/api/expense", expenseRouter)
app.use("/api/dashboard", dashboardRouter)

async function startServer() {
    try {
        await connectDb(); // connect to MongoDB first
        await connectCloudinary(); // if it's async too

        app.listen(PORT, () => {
            console.log(`✅ Server is Running Successfully`);
        });
    } catch (err) {
        console.error(`❌ Error in Starting Server: ${err.message}`);
        process.exit(1);
    }
}

startServer();