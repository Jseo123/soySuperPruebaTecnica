const express = require("express");
const router = express.Router();
const { getCrawlerData, getCrawlerDataPages } = require("../controllers/index");

router.get("/", getCrawlerData);
router.get("/:page", getCrawlerDataPages);

module.exports = router;
