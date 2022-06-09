const { init } = require("../crawler/crawler");
const { myCache } = require("../cache/cache");

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
      const cached = checkIfCached(index);
      if (cached === true) {
        const arrayToAdd = getCached(index);
        addArray(arrayToAdd, fullArray);
      } else {
        const arrayToAdd = await getCrawlerDataPages(index);
        myCache.set(`${index}`, arrayToAdd);
        addArray(arrayToAdd, fullArray);
      }
    }
    res.json(fullArray);
  } catch (error) {
    console.log(error);
  }
};

const checkIfCached = (index) => {
  const key = index.toString();
  if (myCache.has(key)) {
    return true;
  } else {
    return false;
  }
};

const getCached = (index) => {
  const key = index.toString();
  const cachedItems = myCache.get(key);
  return cachedItems;
};

const addArray = (arrayToAdd, fullArray) => {
  arrayToAdd.forEach((element) => {
    fullArray.push(element);
  });
};
module.exports = { getCrawlerData, addedCrawlerData };
