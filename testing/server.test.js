const app = require("../src/server");
const request = require("supertest");

describe("app is using the route properly", () => {
  test("should respond with status with an array", async () => {
    const response = await request(app).get("/").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET /:number", () => {
  test("Should also return an array", async () => {
    const response = await request(app).get("/2").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});
