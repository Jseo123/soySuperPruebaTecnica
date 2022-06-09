const crawler = require("../src/crawler/crawler");

describe("Init function at crawler", () => {
  test("Init should return an array of objects", async () => {
    const response = await crawler.init("https://news.ycombinator.com/");
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeInstanceOf(Object);
  });
});
