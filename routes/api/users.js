const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users/create"
router.route("/create").post(usersController.create);

// Matches with "/api/users/update/:id"
router.route("/update/:id").get(usersController.findById);

module.exports = router;