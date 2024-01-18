
const mongoose = require("mongoose");

const getReadings = async (req, res) => {

    const readingModel = mongoose.model("readings");
    // const usersModel = mongoose.model("users");


    const readings = await readingModel.find({
        user_id: req.user._id
    });


    res.status(200).json({
        status: 'Success',
        message: 'All reading ..',
        data: readings
      
    });

};

module.exports = getReadings;