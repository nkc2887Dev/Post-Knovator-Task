const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  CreatedBy: {
    type: String,
    required: true,
    ref:"User"
  },
  is_active: {
    type: Boolean,
    default: false,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Post", postSchema);
