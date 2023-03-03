const express = require("express");
const route = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controller/userController");

route.post("/register", registerUser);
route.post("/login", loginUser);

module.exports = route;
