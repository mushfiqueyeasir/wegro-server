const express = require("express");
const userController = require("../../Controllers/v1/user.controller");
const verifyToken = require("../../middleware/v1/tokenVerification");

const router = express.Router();

router
  .post("/", userController.createUser)
  .get("/", verifyToken, userController.getAllUser);

router
  .get("/session", verifyToken, userController.session)
  .post("/login", userController.login);

router
  .route("/:userId")
  .get(verifyToken, userController.getUser)
  .put(verifyToken, userController.updateUser)
  .delete(verifyToken, userController.deleteUser);

module.exports = router;
