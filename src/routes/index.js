const express = require("express");
const router = express.Router();
const { getCrawlerData, addedCrawlerData } = require("../controllers/index");

router.get("/", getCrawlerData);
router.get("/:page", addedCrawlerData);

module.exports = router;
