const mongoose = require("mongoose");
require("../../models/Menu");
const Menus = mongoose.model("menu");
const ErrorResponse = require("../helpers/errorResponse");

const getMenus = async (req, res, next) => {
  try {
    const menus = await Menus.find();
    if (menus.length <= 0) {
      next(new ErrorResponse("Menus not found", 404));
    }
    const sortedMenus = menus.sort((a, b) => {
      return a.order - b.order;
    });

    res.status(200).json(sortedMenus);
  } catch (error) {
    next(new ErrorResponse(error.message, error.status));
  }
};
const getMenu = async (req, res, next) => {
  try {
    const menu = await Menus.findById(req.params.id);
    if (!menu) {
      next(new ErrorResponse("No menu found", 404));
    }
    res.status(200).json(menu);
  } catch (error) {
    next(new ErrorResponse(error.message, error.status));
  }
};
const postMenu = async (req, res, next) => {
  try {
    // const menu = await Menu.find();

    const errors = [];
    const { name, url, parentElement, status, order } = req.body;

    if (!url) {
      errors.push({ msg: "url is required" });
    }
    if (!order) {
      errors.push({ msg: "Order is required" });
    }
    if (!name) {
      errors.push({ msg: "Name is required" });
    }
    if (errors.length > 0) {
      return res.status(400).json({
        msg: errors,
      });
    }
    if (parentElement === "topLevel") {
      const newMenuItem = {
        name,
        url,
        status,
        order,
      };
      const newItem = new Menus(newMenuItem);

      await newItem.save();
      return res.status(200).json(newItem);
    }
    const topMenuElement = await Menus.findOne({
      name: parentElement,
    });
    const subMenu = topMenuElement.subMenu;
    const subMenuItem = { name, url, status, order };
    subMenu.push(subMenuItem);
    const ubdatedMenu = await topMenuElement.save();
    return res.status(200).json(ubdatedMenu);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const putMenu = (req, res, next) => {};
const deleteMenu = (req, res, next) => {};

module.exports = {
  getMenu,
  getMenus,
  postMenu,
  putMenu,
  deleteMenu,
};
