const mongoose = require("mongoose");

const usersCollection = mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  occupation: {
    type: String,
  },
  phone: {
    type: String,
  },
  social: {
    type: String,
  },
  role: {
    type: String,
  },
});

const usersInfoSchema = mongoose.model("users", usersCollection);

module.exports = usersInfoSchema;
