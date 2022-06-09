const app = require("../src/server");
const request = require("supertest");
const res = require("express/lib/response");

describe("app is using the route properly", () => {
  test("should respond with status code 200", async () => {
    const response = await request(app).get("/").send();
    console.log(response);
    expect(response.statusCode).toBe(200);
  });
});
