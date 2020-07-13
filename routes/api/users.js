const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");



// Matches with "/api/users/:id"
router.route("/:id")
    // Find user 
    .get(usersController.findById)
    // Update user
    .put(usersController.update)
    // Remove user
    .delete(usersController.remove);

// Matches with "/api/users/password/:id"
router.route("/password/:id").put(usersController.updatePassword);

// Matches with "/api/users/login"
router.route("/login").post(usersController.login);

// Matches with "/api/users/create"
router.route("/create").post(usersController.create);


module.exports = router;