const { init } = require("../crawler/crawler");

const getCrawlerData = async (req, res) => {
  const url = "https://news.ycombinator.com/";
  try {
    let crawledJson = await init(url);
    res.json(crawledJson);
  } catch (error) {
    console.log(error);
  }
};

const getCrawlerDataPages = async (req, res) => {
  try {
    const { page } = req.params;
    const url = `https://news.ycombinator.com/news?p=${page}`;
    let crawledJson = await init(url);
    res.json(crawledJson);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCrawlerData, getCrawlerDataPages };
