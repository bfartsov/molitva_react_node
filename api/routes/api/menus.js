const router = require("express").Router();
const {
  getMenu,
  getMenus,
  putMenu,
  postMenu,
  deleteMenu,
} = require("../../controllers/menuController");
const validObjectId = require("../../middleware/validObjectId");
const { protect } = require("../../middleware/auth");

router
  .route("/")
  .get(getMenus)
  .post(protect, postMenu);
router.route("/id/:id").get(validObjectId, getMenu);
router
  .route("/:id")
  .put(protect, validObjectId, putMenu)
  .delete(protect, validObjectId, deleteMenu);

module.exports = router;
