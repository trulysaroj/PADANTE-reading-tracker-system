const mongoose = require("mongoose");

// User Schema Definition:
const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Fullname is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },

  bookRead: {
    type: Number,
    required: [true, "Book Read is required!"],
    default: 0,
  },
});

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
