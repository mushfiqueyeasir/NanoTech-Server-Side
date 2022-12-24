const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/payment.controller");

//payment
router.route("/").post(paymentController.paymentConfirmation);

module.exports = router;
