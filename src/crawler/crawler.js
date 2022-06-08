const cheerio = require("cheerio");
const request = require("request-promise");
const url = "https://news.ycombinator.com/";

async function init() {
  const $ = await request({
    uri: url,
    transform: (body) => cheerio.load(body),
  });
  const websiteTitle = $(".titlelink");
  console.log(websiteTitle.html());
}

init();
