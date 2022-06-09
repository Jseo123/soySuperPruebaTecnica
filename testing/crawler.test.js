const app = require("../src/server");
const request = require("supertest");
const crawler = require("../src/crawler/crawler");

describe("Init function at crawler", () => {
  test("Init should return an array of type JSON", async () => {
    const response = await crawler.init("https://news.ycombinator.com/");
    expect(response.body).toBeInstanceOf(Array);
  });
});
