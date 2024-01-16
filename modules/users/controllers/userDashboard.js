const mongoose = require("mongoose");

const userDahsboard = async (req, res) => {
  const userModel = mongoose.model("users");

  console.log(req.user);

  // Getting  user details with access token:
  const getUser = await userModel
    .findOne({
      _id: req.user._id,
    }) //.select("name email bookRead");  --> Retriving only name email & bookRead
    .select("-password"); // --> Ommiting password

  res.status(200).json({
    status: "success",
    // message: 'Hello from user dashboard',
    data: getUser,
  });
};

module.exports = userDahsboard;
