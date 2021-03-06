const router = require("express").Router();
const matchesController = require("../../controllers/matchesController");

// Matches with "/api/matches"
router.route("/")
  .get(matchesController.find)
  .post(matchesController.create);

// Matches with "/api/matches/:id"
router.route("/:id")
  .delete(matchesController.remove);

module.exports = router;