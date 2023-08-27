const express = require("express");
const { getConfig } = require("../controllers/config");
const router = express.Router();

router.get("/:id", getConfig);

module.exports = router;
