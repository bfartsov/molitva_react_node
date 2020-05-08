const mongoose = require("mongoose");
require("../models/Menu");
const Menus = mongoose.model("menu");
const ErrorResponse = require("../helpers/errorResponse");
const menuValidationSchema = require("../models/menuValidationSchema");

const getMenus = async (req, res, next) => {
  try {
    const menus = await Menus.find();
    if (menus.length <= 0) {
      return next(new ErrorResponse("Menus not found", 404));
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
      return next(new ErrorResponse("No menu found", 404));
    }
    res.status(200).json(menu);
  } catch (error) {
    next(new ErrorResponse(error.message, error.status));
  }
};
const postMenu = async (req, res, next) => {
  try {
    // const menu = await Menu.find();

    const { name, url, parentElement, status, order } = req.body;

    const { error } = menuValidationSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (error) {
      return next(new ErrorResponse(error.message, 400));
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
    next(new ErrorResponse(error.message, error.status));
  }
};
const putMenu = async (req, res, next) => {
  try {
    const { error } = menuValidationSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (error) {
      console.log(error);
      return next(new ErrorResponse(error.message, 400));
    }
    const menuItem = await Menus.findById(req.params.id);
    const { name, url, order, status } = req.body;
    if (!menuItem) {
      const mainItem = await Menus.findOne({ "subMenu._id": req.params.id });
      const itemIndex = mainItem.subMenu.findIndex((item) => {
        const items = item._id == req.params.id;
        return items;
      });

      const item = mainItem.subMenu[itemIndex];
      item.name = name;
      item.url = url;
      item.status = status;
      item.order = order;
      mainItem.subMenu.splice(itemIndex, 1, item);
      const saveIitem = await mainItem.save();
      return res.status(200).json(saveIitem);
    }
    menuItem.name = name;
    menuItem.url = url;
    menuItem.status = status;
    menuItem.order = order;
    const save = await menuItem.save();
    return res.status(200).json(save);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const menuItem = await Menus.findById(req.params.id);
    if (!menuItem) {
      const mainItem = await Menus.findOne({ "subMenu._id": req.params.id });
      const removeItem = mainItem.subMenu.findIndex((item) => {
        const items = item._id == req.params.id;
        return items;
      });
      mainItem.subMenu.splice(removeItem, 1);
      await mainItem.save();

      return res.status(200).json({
        msg: "Item deleted",
      });
    }
    await Menus.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      msg: "Item deleted",
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

module.exports = {
  getMenu,
  getMenus,
  postMenu,
  putMenu,
  deleteMenu,
};
