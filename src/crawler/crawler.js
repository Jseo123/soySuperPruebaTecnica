const cheerio = require("cheerio");
const request = require("request-promise");

const init = async (url) => {
  const $ = await request({
    uri: url,
    transform: (body) => cheerio.load(body),
  });
  const newsArray = [];
  const userArray = [];
  const completeArray = [];
  const websiteTitle = $(".titlelink ").each((i, el) => {
    const title = $(el).text();
    const url = $(el).attr("href");
    newsArray.push({ title, url });
  });

  //separated this function to keep init at normal size and to be order to test the different parts later.
  await joinArrays(newsArray, userArray, completeArray, $);

  return completeArray;
};

const joinArrays = async (newsArray, userArray, completeArray, $) => {
  //because of the website layout (I hate tables), I was forced to separete website info from the title and to join the title
  // and the rest of the info into a single array when just doing a single cheerio search would have
  //been more efficient.
  const websiteInfo = $(".subtext").each((i, el) => {
    const user = $(el).find(".hnuser").text();
    const score = $(el).find(".score").text();
    const age = $(el).find(".age").text();
    const commentsHtml = $(el).find("a:nth-child(6)").html();
    const comments = formatHtml(commentsHtml);

    userArray.push({ user, score, age, comments });
  });

  for (let index = 0; index < newsArray.length; index++) {
    const newsTitle = newsArray[index].title;
    const userName = userArray[index].user;
    const userScore = userArray[index].score;
    const commentAge = userArray[index].age;
    const commentsAmount = userArray[index].comments;
    const newsUrl = newsArray[index].url;
    completeArray.push({
      newsTitle,
      userName,
      userScore,
      newsUrl,
      commentAge,
      commentsAmount,
    });
  }
};

const formatHtml = (commentsHtml) => {
  const tosplit = commentsHtml;
  if (tosplit !== null) {
    const comments = tosplit.split("&");
    return comments[0];
  } else return "0";
};

module.exports = { init };
