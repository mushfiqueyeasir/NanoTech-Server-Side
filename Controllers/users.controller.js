const {
  getAllUsersInfo,
  getUserInfo,
  postUsersInfo,
  updateUsersInfo,
  getAdminInfo,
  makeAdminInfo,
  deleteAdminInfo,
} = require("../Services/users.service");

exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await getAllUsersInfo();

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
exports.getUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const result = await getUserInfo(email);

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
exports.updateUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const userData = req.body;
    const result = await updateUsersInfo(email, userData);
    res.status(200).json({
      status: "success",
      message: "Review post successfully",
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

//Admin section
exports.getAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;
    const result = await getAdminInfo(email);
    res.status(200).json({
      status: "success",
      message: "Admin get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get Admin an error occurred",
      error: error.message,
    });
  }
};
exports.makeAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;
    const result = await makeAdminInfo(email);
    res.status(200).json({
      status: "success",
      message: "Admin made successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't made admin an error occurred",
      error: error.message,
    });
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteAdminInfo(id);
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't deleted user an error occurred",
      error: error.message,
    });
  }
};
