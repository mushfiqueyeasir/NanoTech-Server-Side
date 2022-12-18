const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

// route
const partsRoute = require("./Routes/parts.route");
const reviewRoute = require("./Routes/reviews.route");
const usersRoute = require("./Routes/users.route");

app.use("/parts", partsRoute);
app.use("/reviews", reviewRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send(`
    <h1> Parts App server is running </h1>
    `);
});

module.exports = app;
