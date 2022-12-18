const {
  getOrdersInfo,
  postOrdersInfo,
  updateOrderInfo,
  deleteOrdersInfo,
} = require("../Services/orders.service");

exports.getOrders = async (req, res, next) => {
  try {
    const result = await getOrdersInfo();

    res.status(200).json({
      status: "success",
      message: "Orders get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get Orders an error occurred",
      error: error.message,
    });
  }
};
exports.postOrders = async (req, res, next) => {
  try {
    const orders = req.body;
    const result = await postOrdersInfo(orders);
    res.status(200).json({
      status: "success",
      message: "Orders post successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't post Orders an error occurred",
      error: error.message,
    });
  }
};
exports.updateSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orders = req.body;
    const result = await updateOrderInfo(id, orders);
    res.status(200).json({
      status: "success",
      message: "Orders post successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't post Orders an error occurred",
      error: error.message,
    });
  }
};
exports.deleteSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteOrdersInfo(id);
    res.status(200).json({
      status: "success",
      message: "Orders post successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't post Orders an error occurred",
      error: error.message,
    });
  }
};
