const express = require("express");
const router = express.Router();
const partsController = require("../Controllers/parts.controller");

//get all parts
router.route("/").get(partsController.getParts).post(partsController.postParts);
router
  .route("/:id")
  .get(partsController.getSingleParts)
  .put(partsController.updateSingleParts);
router.route("/admin/:id").delete(partsController.deleteSingleParts);

module.exports = router;
