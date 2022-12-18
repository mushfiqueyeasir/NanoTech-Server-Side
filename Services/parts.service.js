const partsInfoSchema = require("../Models/partsSchema");
const ObjectId = require("mongodb").ObjectId;
exports.getPartsInfo = async () => {
  const result = await partsInfoSchema.find({});
  return { result };
};
exports.postPartsInfo = async (parts) => {
  const result = await partsInfoSchema.create(parts);
  return { result };
};
exports.getSinglePartsInfo = async (id) => {
  const query = { _id: ObjectId(id) };
  const result = await partsInfoSchema.findOne(query);
  return { result };
};
exports.updateSinglePartsInfo = async (id, data) => {
  const query = { _id: ObjectId(id) };
  const result = await partsInfoSchema.updateOne(query, data);
  return { result };
};
exports.deleteSinglePartsInfo = async (id) => {
  const query = { _id: ObjectId(id) };
  const result = await partsInfoSchema.deleteOne(query);
  return { result };
};
