const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
// const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  // first find User has already registered or not
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create a New User
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      User: newUser,
    });
  } else {
    // User already Exist
    throw new Error("User Already Exist");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check user exist or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: "success",
      findUser,
      refreshToken
    });
  } else {
    throw new Error("Invalid Credential");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
