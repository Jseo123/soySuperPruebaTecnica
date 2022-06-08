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

const getCrawlerDataPages = async (page) => {
  const url = `https://news.ycombinator.com/news?p=${page}`;
  let crawledJson = await init(url);
  return crawledJson;
};

const addedCrawlerData = async (req, res) => {
  const { page } = req.params;
  const fullArray = [];
  try {
    for (let index = 1; index <= page; index++) {
      const arrayToAdd = await getCrawlerDataPages(index);
      arrayToAdd.forEach((element) => {
        fullArray.push(element);
      });
    }
    res.json(fullArray);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getCrawlerData, addedCrawlerData };
