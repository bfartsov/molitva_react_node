const request = require("supertest");
const { app } = require("../app");
require("../models/User");
const { newToken } = require("../middleware/auth");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const {
  getBanner,
  getBanners,
  addBanner,
  editBanner,
  deleteBanner,
} = require("../controllers/bannersController");
const { isFunction } = require("lodash");

describe("API Authentication:", () => {
  let token;
  beforeEach(async () => {
    const user = await User.create({ email: "a@a.com", password: "hello" });
    token = newToken(user);
  });

  describe("api auth", () => {
    test("get 404 nothing in the db", async () => {
      // let response = await request(app).get("/api/live");
      // expect(response.statusCode).toBe(200);

      response = await request(app).get("/api/banners");
      expect(response.statusCode).toBe(404);

      response = await request(app).get("/api/videos");
      expect(response.statusCode).toBe(404);
    });

    // test("passes with JWT", async () => {
    //   const jwt = token;
    //   const id = mongoose.Types.ObjectId();
    //   const results = await Promise.all([
    //     request(app).get("/api/item").set("Authorization", jwt),
    //     request(app).get(`/api/item/${id}`).set("Authorization", jwt),
    //     request(app).post("/api/item").set("Authorization", jwt),
    //     request(app).put(`/api/item/${id}`).set("Authorization", jwt),
    //     request(app).delete(`/api/item/${id}`).set("Authorization", jwt),
    //   ]);

    //   results.forEach((res) => expect(res.statusCode).not.toBe(401));
    // });
  });
});

describe("Banner controllers", () => {
  test("has crud controllers", () => {
    expect(isFunction(getBanner)).toBe(true);
    expect(isFunction(getBanners)).toBe(true);
    expect(isFunction(editBanner)).toBe(true);
    expect(isFunction(addBanner)).toBe(true);
    expect(isFunction(deleteBanner)).toBe(true);
  });
});
