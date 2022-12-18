const express = require("express");
const router = express.Router();
const reviewController = require("../Controllers/reviews.controller");

//get all parts
router
  .route("/")
  .get(reviewController.getReviews)
  .post(reviewController.postReviews);
router.route("/:id").get(reviewController.getSingleReview);

module.exports = router;
