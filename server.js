const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cookieParser());

const isTest = process.env.ISTEST === "true"; // Convert string to boolean

// Get allowed origins from environment variable and convert them to an array
const allowedProdOrigins = process.env.ALLOWED_PROD_ORIGINS
  ? process.env.ALLOWED_PROD_ORIGINS.split(",")
  : [];


// CORS allow any request from localhost
const corsOptions = isTest ? 
{
  origin: function (origin, callback) {
    // Allow requests from localhost with any port
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // credentials: true,
} :
{
  origin: function (origin, callback) {
    if (!origin || allowedProdOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
};

// Enable CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Import routes
const proxyRoutes = require("./routes/proxyRoutes");

// Use the proxy routes
app.use("/api/proxy", proxyRoutes);

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
