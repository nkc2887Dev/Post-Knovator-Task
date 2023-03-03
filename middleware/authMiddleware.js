const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decode?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Authorized Token Incorrect or Expired");
    }
  } else {
    throw new Error("Token Authorization Required");
  }
});

module.exports = {
  authMiddleware,
};
