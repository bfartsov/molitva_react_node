const router = require("../events");

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
