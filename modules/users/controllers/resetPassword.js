const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../manager/emailManager");


const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  // Validation for credentials:
  if(!email)  throw "Email is required";
  if(!new_password) throw "New password is required";
  if(!reset_code) throw "Reset code is required";
  if(new_password < 5) throw "New password must be 5 characters";


// Validating reset code:
 const getUserWithResetCode =  await usersModel.findOne({
    email: email,
    reset_code: reset_code
 });

 if(!getUserWithResetCode) throw "Reset code doesn't match";


// Hashing password with bcrypt & update password:
const hashedPassword = await bcrypt.hash(new_password, 12);

await usersModel.updateOne({
    email: email,
 },
 {
    password: hashedPassword,
    reset_code: "",  // To clear reset code after one time use. 

 });

// Sending a mail after reseting password with nodemailer:
let receiver = email;
let message =  "Your password is reseted successfully";
let html =  "<h3> Your password is reseted successfully </h3>";
let subject = "Your password Reseted  - Padante";
await emailManager(receiver, message, html, subject);


    res.status(200).json({
        status: 'success',
        message: "Your Password has been reseted successfully",
    })
}

module.exports = resetPassword;