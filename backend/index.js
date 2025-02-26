import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


import userRoute from './routes/users.js';
import authRoute from "./routes/auth.js"; // ✅ Correct Import
import hotelRoutes from "./routes/hotel.js"; // ✅ Correct Import

import visaRoutes from "./routes/visaRoutes.js"; // ✅ Correct Import


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:3000', // Update with your frontend URL
    credentials: true,
};

// ✅ Connect to Database First
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB database connected");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1); // Exit process on failure
    }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/hotels", hotelRoutes); // ✅ Correct Route
app.use("/api/v1", visaRoutes);


// ✅ Start Server *Only After* DB is Connected
connect().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server listening on port ${port}`);
    });
});
