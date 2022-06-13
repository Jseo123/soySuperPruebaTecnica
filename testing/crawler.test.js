const Crawler = require("../src/crawler/crawler");

describe("The crawler can fetch news", () => {
  let news;

  test("getPageNews() returns an array of 30 objects", async () => {
    const crawler = new Crawler();
    news = await crawler.getPageNews(1);
    expect(news).toBeInstanceOf(Array);
    expect(news[0]).toBeInstanceOf(Object);
    expect(news.length).toBe(30);
  });

  test("Item has property name", () => {
    expect(news[0].name)
  });

  test("Item has property url", () => {
    expect(news[0].url)
  });

  test("Item has property comments", () => {
    expect(news[0].comments)
  });

  test("Item has property score", () => {
    expect(news[0].score)
  });

});
