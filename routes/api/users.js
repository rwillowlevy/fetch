const router = require("express").Router();
const usersController = require("../../controllers/usersController");


// Matches with "/api/users/:id"
router.route("/:id")
    // Find user 
    .get(usersController.findById)
    // Update user
    .put(usersController.update)
    // Remove user
    .delete(usersController.remove);

// Matches with "/api/users/login"
router.route("/login").post(usersController.login);

// Matches with "/api/users/create"
router.route("/create").post(usersController.create);


module.exports = router;