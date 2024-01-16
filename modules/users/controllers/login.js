const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtManager = require('../../../manager/jwtManager');


const login = async (req, res) => {
    const usersModel = mongoose.model('users');
    const { email, password } = req.body;

    // Checking is user exist or not:
    const getUser = await usersModel.findOne({ email: email})
    if(!getUser) throw "User with this email address dosn't exist";


    // Comparing password that with store in DB:
    const comparePassword = await bcrypt.compare(password, getUser.password);
    if(!comparePassword) throw "Password does not match";


    // Generating access token from JWT(Jason webtoken):
    const accessToken = jwtManager(getUser)


    // Success response after checking all vlaidations:
    res.status(200).json({
        status: 'success',
        message: "User Logged in successfully",
        accessToken: accessToken
    })


}

module.exports = login;