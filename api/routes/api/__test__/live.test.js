const router = require("../live");
const request = require("supertest");
const { app } = require("../../../app");
const path = require("path");
const mongoose = require("mongoose");
const { newToken } = require("../../../middleware/auth");

require("../../../models/User");
require("../../../models/Live");
const User = mongoose.model("user");
const Live = mongoose.model("live");

describe("events route", () => {
  test("has crud routes", () => {
    const routes = [
      { path: "/", method: "get" },
      { path: "/", method: "post" },
    ];

    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});

describe("Live", () => {
  describe("Get", () => {
    describe("get", () => {
      test("if nothing in the db shoud return 404 with msg: No live found", async () => {
        const res = await request(app).get("/api/live");
        expect(res.status).toBe(404);
        expect(res.body.error).toHaveProperty("msg", "live not found");
      });

      test("it shoud return the live object with status 200 if there is something in the db", async () => {
        const live = new Live({
          url: "liveUrl",
          type: "wowza",
          player: "wowza",
        });
        await live.save();

        const res = await request(app).get("/api/live");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("url", "liveUrl");
      });
    });

    describe("post /api/live", () => {
      beforeEach(async () => {
        const user = await User.create({ email: "a@a.com", password: "hello" });
        token = newToken(user);
      });
      test("it shoud create new live if nothing in the db", async () => {
        const res = await request(app)
          .post("/api/live")
          .set("x-auth-token", token)
          .send({
            url: "liveUrl",
            type: "wowza",
            player: "wowza",
          });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("url", "liveUrl");
        expect(res.body).toHaveProperty("type", "wowza");
        expect(res.body).toHaveProperty("player", "wowza");
      });
      test("it shoud return 401 if no token provide", async () => {
        const res = await request(app).post("/api/live");
        expect(res.status).toBe(401);
        expect(res.body.error).toHaveProperty(
          "msg",
          "No token, authorization denied"
        );
      });
      test("it shoud edit live object if alredy exist in the db", async () => {
        const res = await request(app)
          .post("/api/live")
          .set("x-auth-token", token)
          .send({
            url: "newLive",
          });
        expect(res.status).toBe(200);
      });
      test("if url is not provided it shoud return 400", async () => {
        const res = await request(app)
          .post("/api/live")
          .set("x-auth-token", token)
          .send({
            type: "wowza",
          });
        expect(res.status).toBe(400);
        expect(res.body.error).toHaveProperty("msg", '"url" is required');
      });
    });
  });
});
