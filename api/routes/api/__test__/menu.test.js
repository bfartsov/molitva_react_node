const router = require("../menus");
const request = require("supertest");
const { app } = require("../../../app");
const path = require("path");
const mongoose = require("mongoose");
const { newToken } = require("../../../middleware/auth");
const config = require("config");

require("../../../models/User");
require("../../../models/Menu");
const User = mongoose.model("user");
const Menu = mongoose.model("menu");

describe("events route", () => {
  test("has crud routes", () => {
    const routes = [
      { path: "/", method: "get" },
      { path: "/", method: "post" },
      { path: "/id/:id", method: "get" },
      { path: "/:id", method: "delete" },
      { path: "/:id", method: "put" },
    ];

    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});

describe("menus", () => {
  describe("get", () => {
    describe("getAll", () => {
      test("it shoud return 404 if no menus found", async () => {
        const res = await request(app).get("/api/menus");
        expect(res.status).toBe(404);
        expect(res.body.error).toHaveProperty("msg", "Menus not found");
      });
      test("it shoud return 200 with array of menus if menu exist in the db", async () => {
        const menus = [
          { name: "menu1", order: 1 },
          { name: "menu2", order: 2 },
          { name: "menu3", order: 34 },
          { name: "menu3", order: 3 },
        ];
        await Menu.collection.insertMany(menus);
        const res = await request(app).get("/api/menus");
        expect(res.status).toBe(200);
        expect(res.body.some((e) => e.name === "menu1")).toBeTruthy();
        expect(res.body.some((e) => e.name === "menu2")).toBeTruthy();
      });
    });
    describe("getById", () => {
      test("it shoud return 404 if menu not found", async () => {
        const id = mongoose.Types.ObjectId();
        console.log(id);
        const res = await request(app).get("/api/menus/id/" + id);
        expect(res.status).toBe(404);
        expect(res.body.error).toHaveProperty("msg", "No menu found");
      });
      test("it shoud return 200 with menu details if valid id is passed", async () => {
        const menu = new Menu({
          name: "name1",
          order: 1,
        });
        await menu.save();
        const res = await request(app).get("/api/menus/id/" + menu._id);
        expect(res.status).toBe(200);
        expect(res.body.name).toContain(menu.name);
      });
      test("it shoud retun error with msg invalid id and status 400 if other then objectId is passed", async () => {
        const res = await request(app).get("/api/menus/id/1");
        expect(res.status).toBe(404);
        expect(res.body.error.msg).toContain("Invalid id");
      });
    });
  });
  describe("post", () => {
    describe("post Mein Menu", () => {
      beforeEach(async () => {
        const user = await User.create({ email: "a@a.com", password: "hello" });
        token = newToken(user);
      });
      test("it shoud return 200 status and create new menu if all required filds are added and token is provided", async () => {
        const res = await request(app)
          .post("/api/menus")
          .set("x-auth-token", token)
          .send({ name: "menu1", order: 1, parentElement: "topLevel" });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("name", "menu1");
      });
      test("it shoud return 401 if not token provided", async () => {
        const res = await request(app).post("/api/menus");
        expect(res.status).toBe(401);
        expect(res.body.error).toHaveProperty(
          "msg",
          "No token, authorization denied"
        );
      });
      test("it should return invalid token if invalid token is provided", async () => {
        const token = "";
        const res = await request(app)
          .post("/api/menus")
          .set("x-auth-token", token);
        expect(res.status).toBe(401);
        expect(res.body.error).toHaveProperty(
          "msg",
          "No token, authorization denied"
        );
      });
      test("it should return 400 if name is not provided", async () => {
        const res = await request(app)
          .post("/api/menus")
          .set("x-auth-token", token)
          .send({
            order: 1,
          });
        expect(res.status).toBe(400);
      });
      test("it should return 400 if order is not provided", async () => {
        const res = await request(app)
          .post("/api/menus")
          .set("x-auth-token", token)
          .send({
            name: "name",
          });
        expect(res.status).toBe(400);
      });
    });
    describe("post subMenu", () => {
      beforeEach(async () => {
        const user = await User.create({ email: "a@a.com", password: "hello" });
        token = newToken(user);
      });
      test("it shoud return 401 if not token provided", async () => {
        const res = await request(app).post("/api/menus");
        expect(res.status).toBe(401);
        expect(res.body.error).toHaveProperty(
          "msg",
          "No token, authorization denied"
        );
      });
      test("it shoud create submenu if all required info is provided and valid main menu", async () => {
        const mainMenu = new Menu({ name: "menu1", order: 1, subMenu: [] });
        await mainMenu.save();

        const res = await request(app)
          .post("/api/menus")
          .set("x-auth-token", token)
          .send({ name: "subMenu", order: 1, parentElement: "menu1" });
        expect(res.status).toBe(200);
        expect(res.body.subMenu.some((m) => m.name === "subMenu")).toBeTruthy();
      });
    });
  });
});
