const express = require('express');
const auth = require('../../middleware/auth');
const addReading = require('./controllers/addReading');
const getReadings = require('./controllers/getReading');
const editReading = require('./controllers/editReading');
const deleteReading = require('./controllers/deleteReading');

const readingRoutes = express.Router();

// *********************************************************************************
// User routes endpoints here:

//Using auth middleware: -> every routes below this point will be PROTECTED ROUTES:
readingRoutes.use(auth);

readingRoutes.post('/addReading', addReading);
readingRoutes.get('/', getReadings);
readingRoutes.patch('/editReading', editReading);
readingRoutes.delete('/:reading_id', deleteReading);




// *********************************************************************************

module.exports = readingRoutes;