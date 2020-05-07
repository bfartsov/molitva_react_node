const router = require("../events");
const request = require("supertest");
const { app } = require("../../../app");
const path = require("path");
const mongoose = require("mongoose");
const { newToken } = require("../../../middleware/auth");

require("../../../models/User");
require("../../../models/Event");
const User = mongoose.model("user");
const Events = mongoose.model("event");

describe("events route", () => {
  test("has crud routes", () => {
    const routes = [
      { path: "/", method: "get" },
      { path: "/id/:id", method: "get" },
      { path: "/:id", method: "delete" },
      { path: "/:id", method: "put" },
      { path: "/", method: "post" },
      { path: "/limit/:number", method: "get" },
    ];

    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});

describe("events", () => {
  describe("get /api/events", () => {
    describe("getAll", () => {
      test("if nothing in the db shoud return 404 with msg: No events found", async () => {
        const res = await request(app).get("/api/events");
        expect(res.status).toBe(404);
        expect(res.body.error).toHaveProperty("msg", "No events found");
      });
      test("it should return 200  status with array of elements if there is events in the db", async () => {
        const events = [
          { title: "evente1", date: "12/12/12" },
          { title: "evente2", date: "13/12/12" },
        ];
        await Events.collection.insertMany(events);
        const res = await request(app).get("/api/events");
        expect(res.status).toBe(200);
        expect(res.body.some((e) => e.title === "evente1")).toBeTruthy();
        expect(res.body.some((e) => e.title === "evente2")).toBeTruthy();
      });
    });
    describe("getById", () => {
      test("it should return 404 with msg no event found", async () => {
        const id = mongoose.Types.ObjectId();
        const res = await request(app).get("/api/events/id/" + id);
        expect(res.status).toBe(404);
        expect(res.body.error).toHaveProperty("msg", "No event found");
      });
      test("it shoud return 400 if invalid id is passed", async () => {
        const res = await request(app).get("/api/events/id/1");
        expect(res.status).toBe(404);
        expect(res.body.error).toHaveProperty("msg", "Invalid id");
      });
      test("it shoud retutn event with given id", async () => {
        const event = new Events({
          title: "Event1",
          date: "12/12/12",
        });
        await event.save();
        const res = await request(app).get("/api/events/id/" + event.id);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("title", "Event1");
        expect(res.body).toHaveProperty("date", "12/12/12");
      });
    });
    describe("limit the event by number", () => {
      test("it should return first 3 elements if limit is 3", async () => {
        const events = [
          { title: "evemt1", date: "12/12/12" },
          { title: "evemt2", date: "12/12/12" },
          { title: "evemt3", date: "12/12/12" },
          { title: "evemt4", date: "12/12/12" },
        ];
        await Events.collection.insertMany(events);
        const res = await request(app).get("/api/events/limit/3");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
      });
      test("it should return 4040 with messege No events found if invalid limit number is provided", async () => {
        const res = await request(app).get("/api/events/limit/asdf");
        expect(res.status).toBe(400);
        expect(res.body.error).toHaveProperty("msg", "No events found");
      });
    });
  });
  describe("post /api/events", () => {
    beforeEach(async () => {
      const user = await User.create({ email: "a@a.com", password: "hello" });
      token = newToken(user);
    });
    test("it shoud return 200 if all required data is pass", async () => {
      const res = await request(app)
        .post("/api/events")
        .set("x-auth-token", token)
        .attach("img", path.join(__dirname, "1.png"))
        .field("title", "event1")
        .field("date", "12/12/12");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", "event1");
    });
    test("it should return 401 if not logged in( no token provided)", async () => {
      const res = await request(app)
        .post("/api/events")
        .attach("img", path.join(__dirname, "1.png"))
        .field("title", "event1")
        .field("date", "12/12/12");
      expect(res.status).toBe(401);
    });
    test("it should return 400 if img is not provided", async () => {
      const res = await request(app)
        .post("/api/events")
        .set("x-auth-token", token)
        .send({ title: "events1", date: "12/12/12" });
      expect(res.status).toBe(400);
    });
    test("it should return 400 if date is not provided", async () => {
      const res = await request(app)
        .post("/api/events")
        .set("x-auth-token", token)
        .attach("img", path.join(__dirname, "1.png"))
        .field("title", "event1");
      expect(res.status).toBe(400);
    });
    test("it should return 400 if title is not provided", async () => {
      const res = await request(app)
        .post("/api/events")
        .set("x-auth-token", token)
        .attach("img", path.join(__dirname, "1.png"))
        .field("date", "12/12/12");
      expect(res.status).toBe(400);
    });
  });
  describe("delete /api/events/id", () => {
    beforeEach(async () => {
      const user = await User.create({ email: "a@a.com", password: "hello" });
      token = newToken(user);
    });
    test("it should delete the event if valid id is passed", async () => {
      const event = new Events({ title: "event1", date: "12/12/12" });
      await event.save();
      const res = await request(app)
        .delete("/api/events/" + event._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "Item deleted");
    });
    test("it should return 400 with msg No event found if invalid objectid provided", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(app)
        .delete("/api/events/" + id)
        .set("x-auth-token", token);
      expect(res.status).toBe(400);
      expect(res.body.error).toHaveProperty("msg", "No event found");
    });
    test("it should return 400 with if id different then objectid is passed", async () => {
      const res = await request(app)
        .delete("/api/events/1")
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
      expect(res.body.error).toHaveProperty("msg", "Invalid id");
    });
  });

  describe("put /api/events/id", () => {
    beforeEach(async () => {
      const user = await User.create({ email: "a@a.com", password: "hello" });
      token = newToken(user);
    });
    test("it should edit successfuly if all required data and valid token is provided ", async () => {
      const event = new Events({ title: "event1", date: "12/12/12" });
      await event.save();
      const res = await request(app)
        .put("/api/events/" + event._id)
        .set("x-auth-token", token)
        .send({ title: "newTitle", date: "13/13/13" });
      expect(res.status).toBe(200);
    });
    test("it shoud return 401 if not token provided ", async () => {
      const event = new Events({ title: "event1", date: "12/12/12" });
      await event.save();
      const res = await request(app)
        .put("/api/events/" + event._id)
        .send({ title: "newTitle", date: "13/13/13" });
      expect(res.status).toBe(401);
    });
    test("it shoud return 400 title not provided", async () => {
      const event = new Events({ title: "event1", date: "12/12/12" });
      await event.save();
      const res = await request(app)
        .put("/api/events/" + event._id)
        .set("x-auth-token", token)
        .send({ date: "13/13/13" });
      expect(res.status).toBe(400);
    });
    test("it shoud return 400 date not provided", async () => {
      const event = new Events({ title: "event1", date: "12/12/12" });
      await event.save();
      const res = await request(app)
        .put("/api/events/" + event._id)
        .set("x-auth-token", token)
        .send({ title: "newTitle" });
      expect(res.status).toBe(400);
    });
  });
});
