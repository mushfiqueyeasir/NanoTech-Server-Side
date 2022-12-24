const {
  getReviewsInfo,
  postReviewsInfo,
  getSingleReviewsInfo,
} = require("../Services/reviews.service");

exports.getReviews = async (req, res, next) => {
  try {
    const result = await getReviewsInfo();

    res.status(200).json({
      status: "success",
      message: "Review get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get Review an error occurred",
      error: error.message,
    });
  }
};
exports.postReviews = async (req, res, next) => {
  try {
    const reviews = req.body;
    const result = await postReviewsInfo(reviews);
    res.status(200).json({
      status: "success",
      message: "Review post successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't post review an error occurred",
      error: error.message,
    });
  }
};

//single Reviews section
exports.getSingleReview = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getSingleReviewsInfo(id);
    res.status(200).json({
      status: "success",
      message: "review get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get review an error occurred",
      error: error.message,
    });
  }
};
