const usersInfoSchema = require("../Models/userSchema");
const ObjectId = require("mongodb").ObjectId;
exports.getAllUsersInfo = async (email) => {
  const result = await usersInfoSchema.find({});
  return result;
};
exports.getUserInfo = async (email) => {
  const result = await usersInfoSchema.findOne({ email });
  return result;
};
exports.postUsersInfo = async (userData) => {
  const result = await usersInfoSchema.create(email, userData);
  return result;
};
exports.updateUsersInfo = async (email, userData) => {
  const query = { email };
  const result = await usersInfoSchema.updateOne(query, userData);
  return result;
};

//admin section
exports.getAdminInfo = async (email) => {
  const query = { email };
  const result = await usersInfoSchema.findOne(query);
  const isAdmin = result.role == "admin";
  return { isAdmin };
};
exports.makeAdminInfo = async (email) => {
  const query = { email };
  const updateData = { role: "admin" };
  const result = await usersInfoSchema.updateOne(query, updateData);
  return result;
};
exports.deleteAdminInfo = async (id) => {
  const query = { _id: ObjectId(id) };
  const result = await usersInfoSchema.deleteOne(query);
  return result;
};
