const cheerio = require("cheerio");
const request = require("request-promise");
const url = "https://news.ycombinator.com/";

const init = async () => {
  const $ = await request({
    uri: url,
    transform: (body) => cheerio.load(body),
  });
  const titles = [];
  const websiteTitle = $(".titlelink").each((i, el) => {
    const title = $(el).text();
    titles.push({ i, title });
  });
  return titles;
};

module.exports = { init };
