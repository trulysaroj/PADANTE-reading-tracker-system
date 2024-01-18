const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
const jwtManager = require("../../../manager/jwtManager");
const emailManager = require("../../../manager/emailManager");


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


  // Sending mail after register using nodemailer:
  let receiver = email;
  let message = "Welcome to the Padante, where you can keep track records of your book reading without any hassale."
  let html = "<h1> Welcome to the Padant</h1> <br>where you can keep track records of your book reading without any hassale <br> "
  let subject = "Greting from Padante Team";

  await emailManager(receiver, message, html, subject );



  // Response after validating all steps:
  res.status(201).json({
    status: "User created successfully !",
    accessToken: accessToken
  });
};

module.exports = register;
