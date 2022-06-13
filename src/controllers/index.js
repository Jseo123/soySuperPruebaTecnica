const Crawler = require("../crawler/crawler");
const { cached } = require("../cache/cache");

const crawler = new Crawler();

const getCrawlerData = async (req, res) => {
  try {
    res.json( await cachedNews(req.params.page || 1) )
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ error })
  }
}

async function cachedNews(pages) {
  const results = await Promise.all(
    Array.from({length: pages}, (_, i) => i + 1).map( page => {
      return cached( page, () => crawler.getPageNews(page) )
    })
  );
  return results.flat(1);
}

module.exports = { getCrawlerData };
