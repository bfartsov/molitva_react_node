const request = require("supertest");
const { app } = require("../app");
require("../models/User");
require("../models/Timer");
const { newToken } = require("../middleware/auth");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const path = require("path");
describe("API Authentication:", () => {
  let token;
  beforeEach(async () => {
    const user = await User.create({ email: "a@a.com", password: "hello" });
    token = newToken(user);
  });

  describe("api auth", () => {
    test("get 404 nothing in the db", async () => {
      let response = await request(app).get("/api/news");
      expect(response.statusCode).toBe(404);

      response = await request(app).get("/api/banners");
      expect(response.statusCode).toBe(404);

      response = await request(app).get("/api/videos");
      expect(response.statusCode).toBe(404);
    });

    test("access denaid", async () => {
      const id = mongoose.Types.ObjectId();
      const results = await Promise.all([
        request(app).post("/api/banners"),
        request(app).put(`/api/banners/${id}`),
        request(app).delete(`/api/banners/${id}`),
        request(app).post("/api/events"),
        request(app).put(`/api/events/${id}`),
        request(app).delete(`/api/events/${id}`),
        request(app).post("/api/news"),
        request(app).put(`/api/news/${id}`),
        request(app).delete(`/api/news/${id}`),
        request(app).post("/api/videos"),
        request(app).put(`/api/videos/${id}`),
        request(app).delete(`/api/videos/${id}`),
        request(app).post("/api/menus"),
        request(app).put(`/api/menus/${id}`),
        request(app).delete(`/api/menus/${id}`),
        request(app).post("/api/live"),
        request(app).post("/api/timer"),
      ]);

      results.forEach((res) => expect(res.statusCode).toBe(401));
    });
  });
  describe("access allowed with jwt and something in the db", async () => {
    test("access allowed-timer", async () => {
      let response = await request(app)
        .post("/api/timer")
        .set("x-auth-token", token);
      response = await request(app)
        .post("/api/timer")
        .set("x-auth-token", token)
        .send({ date: "12/12/12" });
      expect(response.statusCode).toBe(200);
      expect(response.body.date).toBe("12/12/12");
    });
  });
  test("access allowed-live", async () => {
    let response = await request(app)
      .post("/api/live")
      .set("x-auth-token", token);
    expect(response.statusCode).toBe(500);

    response = await request(app)
      .post("/api/live")
      .set("x-auth-token", token)
      .send({ url: "testUrl" });
    expect(response.statusCode).toBe(200);
    expect(response.body.url).toBe("testUrl");
  });
  test("access allowed-banner", async () => {
    let response = await request(app)
      .post("/api/banners")
      .set("x-auth-token", token)
      .field("title", "testTitle")
      .field("eventDate", "12/12/12")
      .attach("img", path.join(__dirname, "1.png"));
    expect(response.statusCode).toBe(200);
  });
  test("bed request - banners", async () => {
    let response = await request(app)
      .post("/api/banners")
      .set("x-auth-token", token)
      .field("eventDate", "12/12/12")
      .attach("img", path.join(__dirname, "1.png"));
    expect(response.statusCode).toBe(401);
  });
});
