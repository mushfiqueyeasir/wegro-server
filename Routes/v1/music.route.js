const express = require("express");
const musicController = require("../../Controllers/v1//music.controller");

const router = express.Router();

router.get("/",  musicController.getAll);

module.exports = router;
