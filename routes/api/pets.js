const router = require("express").Router();
const petsController = require("../../controllers/petsController");

// Matches with "/api/pets/:id"
router.route("/:id")
    // Find pet 
    .get(petsController.findById)
    // Update pet
    .put(petsController.update)
    // Remove pet
    .delete(petsController.remove);

// Matches with "/api/pets/create"
router.route("/create").post(petsController.create);

module.exports = router;