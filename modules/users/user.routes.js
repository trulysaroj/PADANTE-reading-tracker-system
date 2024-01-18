const express = require('express');
const register = require('./controllers/register');
const login = require('./controllers/login');
const userDahsboard = require('./controllers/userDashboard');
const auth = require('../../middleware/auth');
const forgetPassword = require('./controllers/forgetPassword');
const resetPassword = require('./controllers/resetPassword');

const userRoutes = express.Router();

// *********************************************************************************
// User routes endpoints here:
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/forgotPassword', forgetPassword);
userRoutes.post('/resetPassword', resetPassword);


//Using auth middleware: -> every routes below this point will be PROTECTED ROUTES:
userRoutes.use(auth);
userRoutes.get('/userDashboard', userDahsboard);



// *********************************************************************************

module.exports = userRoutes;