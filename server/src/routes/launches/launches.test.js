const request = require("supertest");
const app = require("../../app");

describe("TEST GET /launches", () => {
  test("It should respond with 200 success ", async () => {
    const response = await request(app).get("/launches").expect(200);
  });
});
describe("TEST POST /launches", () => {
  const completeLaunchDate = {
    mission: "USS Enterprises",
    rocket: "GGG 2105-f",
    target: "Kepler-186 f",
    launchDate: "May 21,2029",
  };
  const launchDataWithoutDate = {
    mission: "USS Enterprises",
    rocket: "GGG 2105-f",
    target: "Kepler-186 f",
  };
  const launchDatawithInvalidDate = {
    mission: "USS Enterprises",
    rocket: "GGG 2105-f",
    target: "Kepler-186 f",
    launchDate: "gopal",
  };
  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchDate)
      .expect(201);
    const requestDate = new Date(completeLaunchDate.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDatawithInvalidDate)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch Date",
    });
  });
});
