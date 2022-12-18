const mongoose = require("mongoose");

const partsCollection = mongoose.Schema({
  partsName: {
    type: String,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  minOrderQuantity: {
    type: String,
  },
  availableQuantity: {
    type: String,
  },
  price: {
    type: String,
  },
});

const partsInfoSchema = mongoose.model("parts", partsCollection);

module.exports = partsInfoSchema;
