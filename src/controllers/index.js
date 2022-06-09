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
    const cached = checkIfCached(page);

    if (cached === false) {
      for (let index = 1; index <= page; index++) {
        const arrayToAdd = await getCrawlerDataPages(index);
        myCache.set(`${index}`, arrayToAdd);
        arrayToAdd.forEach((element) => {
          fullArray.push(element);
        });
      }
      res.json(fullArray);
    } else {
      const cache = getCached(page);
      res.json(cache);
    }
  } catch (error) {
    console.log(error);
  }
};

const checkIfCached = (page) => {
  const key = page.toString();
  if (myCache.has(key)) {
    return true;
  } else {
    return false;
  }
};

const getCached = (page) => {
  const cachedItems = [];
  for (let index = 1; index <= page; index++) {
    const key = index.toString();
    const items = myCache.get(key);
    cachedItems.push(items);
  }
  return cachedItems;
};
module.exports = { getCrawlerData, addedCrawlerData };
