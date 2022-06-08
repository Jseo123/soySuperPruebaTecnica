const express = require("express");
const { send } = require("express/lib/response");
const morgan = require("morgan");
const { init } = require("../crawler/crawler");

const getCrawlerData = async (req, res) => {
  let crawledJson = await init();
  res.json(crawledJson).pretty();
};

module.exports = { getCrawlerData };
