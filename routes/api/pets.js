const router = require("express").Router();
const petsController = require("../../controllers/petsController");

// Matches with "/api/matches"
router.route("/")
  .get(petsController.findAll)
  .post(petsController.create);

// Matches with "/api/matches/:id"
router.route("/:id")
  .get(petsController.findById)
  .delete(petsController.remove);

module.exports = router;