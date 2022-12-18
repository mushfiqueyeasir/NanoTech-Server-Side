const ordersInfoSchema = require("../Models/ordersSchema");
const ObjectId = require("mongodb").ObjectId;
exports.getOrdersInfo = async (email) => {
  const result = await ordersInfoSchema.find({});
  return result;
};
exports.postOrdersInfo = async (userData) => {
  const result = await ordersInfoSchema.create(userData);
  return { result };
};
exports.updateOrderInfo = async (id, userData) => {
  const query = { _id: ObjectId(id) };
  const result = await ordersInfoSchema.updateOne(query, userData);
  return { result };
};
exports.deleteOrdersInfo = async (id) => {
  const query = { _id: ObjectId(id) };
  const result = await ordersInfoSchema.deleteOne(query);
  return { result };
};
