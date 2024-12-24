const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// Define allowed origins
const allowedOrigins = ["http://localhost:5173", "https://chatlcu.vercel.app"]; // Add your frontend URLs here

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from whitelisted origins or no origin (e.g., mobile apps, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

// Middleware to parse JSON
app.use(bodyParser.json());

// API Routes
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the ChatLCU Backend API!");
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
