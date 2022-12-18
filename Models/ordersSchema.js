const mongoose = require("mongoose");

const ordersCollection = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  product: {
    type: String,
  },
  productBrand: {
    type: String,
  },
  img: {
    type: String,
  },
  quantity: {
    type: String,
  },
  price: {
    type: String,
  },
  paid: {
    type: String,
  },
});

const ordersInfoSchema = mongoose.model("orders", ordersCollection);

module.exports = ordersInfoSchema;
