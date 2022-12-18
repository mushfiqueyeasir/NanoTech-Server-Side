const {
  getPartsInfo,
  postPartsInfo,
  getSinglePartsInfo,
  updateSinglePartsInfo,
  deleteSinglePartsInfo,
} = require("../Services/parts.service");

exports.getParts = async (req, res, next) => {
  try {
    const result = await getPartsInfo();

    res.status(200).json({
      status: "success",
      message: "task get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get Task an error occurred",
      error: error.message,
    });
  }
};
exports.postParts = async (req, res, next) => {
  try {
    const parts = req.body;
    const result = await postPartsInfo(parts);
    res.status(200).json({
      status: "success",
      message: "task post successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get Task an error occurred",
      error: error.message,
    });
  }
};

//single parts section
exports.getSingleParts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getSinglePartsInfo(id);
    res.status(200).json({
      status: "success",
      message: "task post successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get Task an error occurred",
      error: error.message,
    });
  }
};

exports.updateSingleParts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const parts = req.body;
    const result = await updateSinglePartsInfo(id, parts);
    res.status(200).json({
      status: "success",
      message: "task post successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get Task an error occurred",
      error: error.message,
    });
  }
};
exports.deleteSingleParts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteSinglePartsInfo(id);
    res.status(200).json({
      status: "success",
      message: "task post successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get Task an error occurred",
      error: error.message,
    });
  }
};
