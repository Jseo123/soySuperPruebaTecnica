const express = require("express");
const router = express.Router();
const { getCrawlerData } = require("../controllers/index");

router.get("/", getCrawlerData);
router.get("/:page", getCrawlerData);

module.exports = router;
