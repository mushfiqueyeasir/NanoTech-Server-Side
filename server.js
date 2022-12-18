const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

//database connection
console.log(process.env.MONGODB_URI, "from bok");
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`Parts App Backend is connected with database successfully`);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Parts App is listening on port", port);
});
