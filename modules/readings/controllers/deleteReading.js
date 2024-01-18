const mongoose = require("mongoose");
const validator = require("validator");

const deleteReading = async (req, res) => {
  const readingModel = mongoose.model("readings");
  const usersModel = mongoose.model("users");
  const { reading_id } = req.params;

  // Validating params id to mongoDB object Id
  if (!validator.isMongoId(reading_id.toString()))
    throw "Please provide a valid ID";

  const getReading = await readingModel.findOne({
    _id: reading_id,
  });


  if (getReading.status === "Finished") {
    // For decreasing the bookRead Number if the status is finished :
    await usersModel.findByIdAndUpdate(
      req.user._id,
      { $inc: { bookRead: -1 } },
      { runValidators: true, new: true }
    );
  }  

    await readingModel.findOneAndDelete({
      _id:reading_id,
    });
  


  //   console.log('Deleted Reading:', deletedReading);

  res.status(200).json({
    status: "success",
    message: "Reading deleted successfully",
  });
};

module.exports = deleteReading;
