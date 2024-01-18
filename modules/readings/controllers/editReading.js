const mongoose = require("mongoose");
const validator = require("validator");

const editReading = async (req, res) => {
  const readingModel = mongoose.model("readings");
  const userModel = mongoose.model("users");
  const {
    reading_id,
    bookName,
    author,
    page,
    genre,
    description,
    pageRead,
    status,
  } = req.body;

 
  const getReading = await readingModel.findOne({
    _id: reading_id,
    // user_id: req.user._id,
  });

  // Validating params id to mongoDB object Id
  if (!validator.isMongoId(reading_id.toString()))
    throw "Please provide a valid ID";

  await readingModel.findOneAndUpdate(
    { _id: reading_id },
    {
      $set: {
        bookName: bookName,
        author: author,
        page: page,
        genre: genre,
        description: description,
        pageRead: pageRead,
        status: status,
      },
    },

    { runValidators: true, new: true }
  );

  if (pageRead === page) {
    await userModel.findByIdAndUpdate(
      req.user._id,
      { $inc: { bookRead: 1 } },
      { runValidators: true, new: true }
    );
  }

  res.status(200).json({
    status: "success",
    message: "Updated reading successfully",
  });
};

module.exports = editReading;
