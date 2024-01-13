require("express-async-errors");
require("dotenv").config();
const express = require("express");
const errorHandler = require("./handlers/errorHandlers");
const mongoose = require("mongoose");

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
app.use(express.json());


// Initialization a Model:
require('./models/users.model')



// **************************************************************************************
// API Routes Start Here:




// API Routes End here:
// **************************************************************************************

app.use(errorHandler); // For handling errors with express async error

app.listen(8000, () => {
  console.log("Server started successfully on port 8000");
});
