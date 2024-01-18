require("express-async-errors");
require("dotenv").config();
const express = require("express");
const errorHandler = require("./handlers/errorHandlers");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./modules/users/user.routes");
const readingRoutes = require("./modules/readings/readings.routes");


// **************************************************************************************

// Database connection:
mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("MongoDB connection successfull !!");
  })
  .catch(() => {
    console.log("MongoDB connection failed :(");
  });

// Express Server:
const app = express();
app.use(cors()); // For Allowing access backend or APIs Endpoints from anywhere:
app.use(express.json());

// Initialization a Model:
require("./models/users.model");
require("./models/readings.model");


// **************************************************************************************
// API Routes Start Here:
app.use("/api/users", userRoutes);
app.use("/api/readings", readingRoutes);

// API Routes End here:
// **************************************************************************************

// Sending custom 404 error messages:
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "Sorry, Page not found :(",
  });
});

app.use(errorHandler); // For handling errors with express async error

app.listen(8000, () => {
  console.log("Server started successfully on port 8000");
});
