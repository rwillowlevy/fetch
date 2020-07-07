const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/create").post(usersController.create);

// Matches with "/api/users/:id"
router.route("/:id")
  .get(usersController.findById)
  .delete(usersController.remove);

module.exports = router;