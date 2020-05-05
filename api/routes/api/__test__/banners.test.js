const router = require("../banners");
const request = require("supertest");
const { app } = require("../../../app");
const path = require("path");
const mongoose = require("mongoose");
const { newToken } = require("../../../middleware/auth");

require("../../../models/User");
require("../../../models/Banner");
const User = mongoose.model("user");
const Banners = mongoose.model("banner");
describe("banner route", () => {
  test("has crud routes", () => {
    const routes = [
      { path: "/", method: "get" },
      { path: "/:id", method: "get" },
      { path: "/:id", method: "delete" },
      { path: "/:id", method: "put" },
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

describe("benner", () => {
  let token;
  beforeEach(async () => {
    const user = await User.create({ email: "a@a.com", password: "hello" });
    token = newToken(user);
  });
  test("get all", async () => {
    const banners = [
      {
        title: "banner1",
      },
      { title: "banner2" },
    ];
    await Banners.collection.insertMany(banners);
    const res = await request(app).get("/api/banners");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body.some((b) => b.title === "banner1")).toBeTruthy();
    expect(res.body.some((b) => b.title === "banner2")).toBeTruthy();
  });
  describe("get by id", () => {
    test("shoud return banner if valid id is passed", async () => {
      const banner = new Banners({
        title: "banner1",
        eventDate: "12/12/12",
      });
      await banner.save();
      const res = await request(app).get(`/api/banners/${banner._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", banner.title);
    });
    test("is shoud return 404 of invalid id is passed", async () => {
      const res = await request(app).get("/api/banners/1");
      expect(res.status).toBe(404);
    });
    test("it should return 404 if no banner with given id exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/banners/${id}`);
      expect(res.status).toBe(404);
    });
  });
  describe("delete banners", async () => {
    beforeEach(async () => {
      const user = await User.create({ email: "a@a.com", password: "hello" });
      token = newToken(user);
    });
    test("it should return 401 if not logged in", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/banners/${id}`);
      expect(res.status).toBe(401);
    });
    test("it should return 404 if banner with given id does not exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/banners/${id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });

    test("it should delete the banner if input is valid", async () => {
      const banner = new Banners({ title: "banner", eventDate: "12/12/12" });
      await banner.save();

      const res = await request(app)
        .delete(`/api/banners/${banner._id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "Item deleted");
      const bannerInDb = await Banners.findById(banner._id);
      expect(bannerInDb).toBeNull();
    });
  });

  describe("post", () => {
    test("it should successfuly add teh banner if title, eventDate and img are send and valid token is provide", async () => {
      let response = await request(app)
        .post("/api/banners")
        .set("x-auth-token", token)
        .field("title", "testTitle")
        .field("eventDate", "12/12/12")
        .attach("img", path.join(__dirname, "1.png"));
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("title", "testTitle");
    });
    test("it sould return 401 if title is missing and valid token is provide", async () => {
      let response = await request(app)
        .post("/api/banners")
        .set("x-auth-token", token)
        .field("eventDate", "12/12/12")
        .attach("img", path.join(__dirname, "1.png"));
      expect(response.status).toBe(401);
    });
    test("it sould return 401 if eventDate is missing and valid token is provide", async () => {
      let response = await request(app)
        .post("/api/banners")
        .set("x-auth-token", token)
        .field("title", "title")
        .attach("img", path.join(__dirname, "1.png"));
      expect(response.status).toBe(401);
    });
    test("it sould return 401 if img is missing and valid token is provide", async () => {
      let response = await request(app)
        .post("/api/banners")
        .set("x-auth-token", token)
        .field("title", "title")
        .field("eventDate", "12/12/12");
      expect(response.status).toBe(401);
    });

    test("it should return 401 if token is not provided", async () => {
      const res = await request(app).post("/api/banners");
      expect(res.status).toBe(401);
    });
    test("it should return 401 if invalid token is provided", async () => {
      const token = "";
      const res = await request(app)
        .post("/api/banners")
        .set("x-auth-token", token);

      expect(res.status).toBe(401);
    });
  });
  describe("put", () => {
    beforeEach(async () => {
      const user = await User.create({ email: "a@a.com", password: "hello" });
      token = newToken(user);
    });
    test("it shoud successfuly edit a banner info if all required fields are sent", async () => {
      const banner = new Banners({ title: "banner", eventDate: "12/12/12" });
      await banner.save();
      const res = await request(app)
        .put(`/api/banners/${banner._id}`)
        .set("x-auth-token", token)
        .field("title", "newTitle")
        .field("eventDate", "13/12/13")
        .attach("img", path.join(__dirname, "1.png"));
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", "newTitle");
      expect(res.body).toHaveProperty("eventDate", "13/12/13");
    });
    test("it shoud retur 401 if token is not provides", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(app).put(`/api/banners/${id}`);
      expect(res.status).toBe(401);
    });
    test("it shoud retur 401 if invalid token is  provides", async () => {
      const id = mongoose.Types.ObjectId();
      const token = "";
      const res = await request(app)
        .put(`/api/banners/${id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(401);
    });
  });
});
