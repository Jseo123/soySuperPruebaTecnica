const cheerio = require("cheerio");
const request = require("request-promise");

class Crawler {
  async getPageNews(page=1) {
    const $    = await this.getPageDOM(page);

    const news = $(".titlelink").map((i, el) => {
      return {
        title: $(el).text(),
        url:   $(el).attr("href")
      }
    }).get();

    $(".subtext").each((i, el) => {
      news[i].user     = $(el).find(".hnuser").text();
      news[i].score    = num($(el).find(".score").text());
      news[i].age      = $(el).find(".age").text();
      news[i].comments = num($(el).find("a").last().text());
    });

    return news;
  }

  async getPageDOM(page) {
    const url = `https://news.ycombinator.com/news?p=${page}`;
    return await request({
      uri: url,
      transform: (body) => cheerio.load(body),
    });
  }

}

function num(str) {
  return parseInt( str.replace( /\D+/g, '' ) );
}

module.exports = Crawler;
