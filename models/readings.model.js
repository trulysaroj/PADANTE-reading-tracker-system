const mongoose = require("mongoose");

// Reading Schema Definition:
const readingsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    bookName: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    page: {
      type: Number,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    pageRead: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["Reading", "Finished", "To Read"],
    },
  },
  { timestamps: true }
);

const readingModel = mongoose.model("readings", readingsSchema);
module.exports = readingModel;
