const express = require("express");
const { getConfig } = require("../controllers/config");
const router = express.Router();

router.get("/", getConfig);

module.exports = router;
