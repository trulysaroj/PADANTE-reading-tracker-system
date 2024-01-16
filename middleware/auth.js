const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // console.log(req.headers);

  try {
    // Getting access token from request headers:
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    // Verifying access token with JWT:
    const JWTvarification = jwt.verify(accessToken, process.env.jwt_secret_key);
    req.user = JWTvarification;

  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Unauthorized",
    });
    return;
  }

  next();
};

module.exports = auth;
