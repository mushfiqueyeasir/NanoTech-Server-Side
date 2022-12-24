const reviewInfoSchema = require("../Models/reviewSchema");
const ObjectId = require("mongodb").ObjectId;
exports.getReviewsInfo = async () => {
  const result = await reviewInfoSchema.find({});
  return result;
};
exports.postReviewsInfo = async (reviews) => {
  const result = await reviewInfoSchema.create(reviews);
  return result;
};
exports.getSingleReviewsInfo = async (id) => {
  const query = { _id: ObjectId(id) };
  const result = await reviewInfoSchema.findOne(query);
  return result;
};
