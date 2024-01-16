const jwt = require('jsonwebtoken');


// For centralizing JWT token generation with code refactoring:
const jwtManager = (user) => {

  // Generating access token from JWT(Jason webtoken):
  const accessToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
    },
    process.env.jwt_secret_key
  );
  return accessToken;
};

module.exports = jwtManager;
