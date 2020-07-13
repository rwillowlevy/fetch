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

// Matches with "/api/pets/create/:id"
router.route("/create/:id").post(petsController.create);

// Matches with "/api/pets/upload"
router.route("/upload").post(petsController.uploadImage);

module.exports = router;