const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/users.controller");

//get all parts
router.route("/").get(usersController.getAllUsers);
router
  .route("/:email")
  .get(usersController.getUser)
  .put(usersController.updateUser);
router
  .route("/admin/:email")
  .get(usersController.getAdmin)
  .put(usersController.makeAdmin);
router.route("/admin/:id").delete(usersController.deleteUser);

module.exports = router;
