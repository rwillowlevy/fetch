const router = require("express").Router();
const userRoutes = require("./users");
const petRoutes = require("./pets");
const matchRoutes = require("./matches");
const swipeRoutes = require("./swipes");
const messageRoutes = require("./messages");

// ===== ROUTES =====
router.use("/users", userRoutes);
router.use("/pets", petRoutes);
router.use("/matches", matchRoutes);
router.use("/swipes", swipeRoutes);
router.use("/messages", messageRoutes);

module.exports = router;