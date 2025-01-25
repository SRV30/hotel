import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
// Routes
import hotelRoutes from "./routes/hotels.js";
import vehicleRoutes from "./routes/vechicles.js";  
import regionRoutes from "./routes/regions.js";

dotenv.config();


const username=process.env.DB_USERNAME;
const password=process.env.PASSWORD;    
const url=`mongodb+srv://${username}:${password}@cluster0.wzf24.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Connect to DB
connectDB(url);

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
      message: "Server is running " + PORT,
    });
  });

// API Routes
app.use("/api", hotelRoutes);
app.use("/api", vehicleRoutes);
app.use("/api", regionRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
