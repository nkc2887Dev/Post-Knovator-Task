const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const passportJWT = require('passport-jwt');
const dbConnect = require("./config/dbConnect");
const port = process.env.PORT || 8080;
dbConnect(); // database
const userRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
