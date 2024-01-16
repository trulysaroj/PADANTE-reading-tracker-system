const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwtManager = require("../../../manager/jwtManager");


const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { name, email, password, confirm_password, bookRead } = req.body;

  // Validatating credentials of users:
  if (!name) throw "Name is required";
  if (!email) throw "Email is required";
  if (!password) throw "Password is required";
  if (password.length < 5) throw "Password must be at least 5 characters";
  if (password !== confirm_password)
    throw "Confirm password  & password must be same";

    
  // checking if eamil already exists or not:
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });
  if (getDuplicateEmail) throw "This email already exists";


  // Hashing password with bcrypt:
  const hashedPassword = await bcrypt.hash(password, 12);

  // Creating users into the database:
  const createdUser=  await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    bookRead: bookRead,
  });


  // Generating access token from JWT(Jason webtoken):
  const accessToken = jwtManager(createdUser)

  res.status(201).json({
    status: "User created successfully !",
    accessToken: accessToken
  });
};

module.exports = register;
