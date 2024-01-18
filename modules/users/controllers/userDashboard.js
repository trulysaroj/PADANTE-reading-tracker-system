const mongoose = require("mongoose");

const userDahsboard = async (req, res) => {
  const userModel = mongoose.model("users");
  const readingModel = mongoose.model("readings");


  console.log(req.user);

  // Getting  user details with access token:
  const getUser = await userModel
    .findOne({
      _id: req.user._id,
    }) //.select("name email bookRead");  --> Retriving only name email & bookRead
    .select("-password"); // --> Ommiting password


  // For retreving a recent reading data:
  const readings = await readingModel.find({
    user_id: req.user._id,

  })
  // To sort by decending order ie. Latest reading & limit reading
  .sort("-createdAt")
  .limit(2);


  res.status(200).json({
    status: "success",
    // message: 'Hello from user dashboard',
    data: getUser,
    readings
  });
};

module.exports = userDahsboard;
