const app = require("../src/server");
const request = require("supertest");

describe("app is using the route properly", () => {
  test("should respond with status 200 and an array and type JSON", async () => {
    const response = await request(app).get("/").send();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

describe("GET /:number", () => {
  test("Should also return an array and status  200 and type JSON", async () => {
    const response = await request(app).get("/2").send();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
