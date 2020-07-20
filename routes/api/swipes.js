const router = require("express").Router();
const swipesController = require("../../controllers/swipesController");

// Matches with "/api/swipes"
router.route("/")
  .post(swipesController.create);

// Matches with "/api/swipes/:id"
router.route("/:id")
  .get(swipesController.findById)
  .delete(swipesController.remove);

module.exports = router;