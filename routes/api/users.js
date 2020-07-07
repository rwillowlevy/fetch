const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users/login"
router.route("/login").post(passport.authenticate("local"), usersController.login);

// Matches with "/api/users/:id"
router.route("/:id").get(usersController.findById);

// Matches with "/api/users/create"
router.route("/create").post(usersController.create);

// Matches with "/api/users/:id"
router.route("/update/:id").put(usersController.update);

module.exports = router;