const express = require("express");
const router = express.Router();
const ordersController = require("../Controllers/orders.controller");

//get all parts
router
  .route("/")
  .get(ordersController.getOrders)
  .post(ordersController.postOrders);
router
  .route("/:id")
  .put(ordersController.updateSingleOrder)
  .delete(ordersController.deleteSingleOrder);
router.route("/:email").get(ordersController.getUserByMail);

module.exports = router;
