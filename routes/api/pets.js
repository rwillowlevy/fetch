const router = require("express").Router();
const petsController = require("../../controllers/petsController");

// Matches with "/api/pets"
router.route("/").get(petsController.findAll)

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

// Matches with "/api/pets/upload/:id"
router.route("/upload/:id").post(petsController.uploadImage);

module.exports = router;