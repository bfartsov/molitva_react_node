const {
  getBanner,
  getBanners,
  addBanner,
  editBanner,
  deleteBanner,
} = require("../bannersController");

const {
  getEvent,
  getEvents,
  getEventsNumber,
  addEvent,
  updateEvent,
  deleteEvent,
} = require("../eventsController");
const { isFunction } = require("lodash");
const {
  mockNext,
  mockResponse,
  mockeRequest,
} = require("../../helpers/interceptor");

describe("Api controllers", () => {
  describe("banner controller", () => {
    test("Banners crud shoud return function", () => {
      expect(isFunction(getBanner)).toBe(true);
      expect(isFunction(getBanners)).toBe(true);
      expect(isFunction(editBanner)).toBe(true);
      expect(isFunction(addBanner)).toBe(true);
      expect(isFunction(deleteBanner)).toBe(true);
    });
  });
  describe("events controller", () => {
    test("Events crud shuld return function", () => {
      expect(isFunction(getEvent)).toBe(true);
      expect(isFunction(getEvents)).toBe(true);
      expect(isFunction(getEventsNumber)).toBe(true);
      expect(isFunction(addEvent)).toBe(true);
      expect(isFunction(updateEvent)).toBe(true);
      expect(isFunction(updateEvent)).toBe(true);
      expect(isFunction(deleteEvent)).toBe(true);
    });
  });

  describe("Check method 'getBanners'", () => {
    test("it should call next if no banners found in the db", async () => {
      let req = mockeRequest();
      let res = mockResponse();

      const next = mockNext();
      await getBanners(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
