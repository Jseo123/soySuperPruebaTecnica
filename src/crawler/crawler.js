const cheerio = require("cheerio");
const request = require("request-promise");

const init = async (url) => {
  const $ = await request({
    uri: url,
    transform: (body) => cheerio.load(body),
  });
  const newsArray = [];
  const completeArray = [];
  const websiteTitle = $(".titlelink ").each((i, el) => {
    const title = $(el).text();
    newsArray.push({ title });
  });

  //separated this function to keep init at normal size and to be order to test the different parts later.
  await joinArrays(newsArray, completeArray, $);

  return completeArray;
};

const joinArrays = async (newsArray, completeArray, $) => {
  //because of the website layout (I hate tables), I was forced to separete website info from the title and to join the title
  // and the rest of the info into a single array I was forced to map it when just doing a single cheerio search would have
  //been more efficient.
  const websiteInfo = $(".subtext").each((i, el) => {
    const user = $(el).find(".hnuser").html();
    newsArray.map((e) => {
      let arrayTitle = e.title;
      completeArray.push({ arrayTitle, user });
    });
  });
};

module.exports = { init };
