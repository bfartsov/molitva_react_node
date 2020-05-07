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
    describe("getAll", () => {
      test("if nothing in the db shoud return 404 with msg: No live found", async () => {
        // const res = await request(app).get("/api/live");
        // expect(res.status).toBe(404);
        // expect(res.body.error).toHaveProperty("msg", "Live not found");
      });
    });
  });
});
