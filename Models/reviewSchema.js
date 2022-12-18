const mongoose = require("mongoose");

const reviewCollection = mongoose.Schema({
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  rating: {
    type: String,
  },
  message: {
    type: String,
  },
});

const reviewInfoSchema = mongoose.model("reviews", reviewCollection);

module.exports = reviewInfoSchema;
