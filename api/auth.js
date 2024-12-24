const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("../routes/authRoutes"); // Adjust path as needed

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Export handler for Vercel
module.exports = app;
