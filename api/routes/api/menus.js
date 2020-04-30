const router = require("express").Router();
const {
  getMenu,
  getMenus,
  putMenu,
  postMenu,
  deleteMenu,
} = require("../../controllers/menuController");
const { protect } = require("../../middleware/auth");

router.route("/").get(getMenus).post(protect, postMenu);
router.route("/id/:id").get(getMenu);
router.route("/:id").put(protect, putMenu).delete(protect, deleteMenu);

module.exports = router;
