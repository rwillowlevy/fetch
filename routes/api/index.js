const router = require("express").Router();
const userRoutes = require("./users");
const matchRoutes = require("./matches");
const messageRoutes = require("./messages");

// ===== ROUTES =====
router.use("/user", userRoutes);
router.use("/matches", matchRoutes);
router.use("/messages", messageRoutes);

module.exports = router;