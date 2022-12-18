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
const ordersRoute = require("./Routes/orders.route");

app.use("/parts", partsRoute);
app.use("/reviews", reviewRoute);
app.use("/users", usersRoute);
app.use("/orders", ordersRoute);

app.get("/", (req, res) => {
  res.send(`
    <h1> Parts App server is running </h1>
    <p>    
/parts >get, post </br>
/parts/:id >get,put </br>
/parts/admin/:id > del </br>

</br></br>
/reviews > post, get,  </br>
/reviews/:id >get, </br>

</br></br>
/users/:email > put, get </br>
/users > get </br>
/users/admin/:email > put,get,del </br>

</br></br>
/orders >post,get </br>
/orders/:id > put, del </br>
/orders/:email > get </br>
    </p>
    `);
});

module.exports = app;
