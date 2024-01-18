const mongoose = require("mongoose");
// const nodemailer = require('nodemailer');
const emailManager = require("../../../manager/emailManager");



const forgetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;
  if (!email) throw "Email is required";

  // Checking if user exists or not:
  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "Sorry, user with this email does not exist in system";

  const resetCode = Math.floor(10000 + Math.random() * 9000);
  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidator: true,
    }
  );


  // Sending resetCode into userEmail:
  
  // Sending mail after register using nodemailer:
  let receiver = email;
  let message =  `Your password reset code is ${resetCode}`;
  let html = `Your password reset code is ${resetCode}`;
  let subject = "Reset your password - Padante";
  await emailManager(receiver, message, html, subject );


  res.status(200).json({
    status: "Reset code send to this email successfully",
    // Message: "Reset password code is send to your email successfully",
  });
};

module.exports = forgetPassword;
