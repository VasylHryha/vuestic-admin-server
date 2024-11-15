const express = require("express");
const router = express.Router();
const userRoutes = require("./users");
const projectRoutes = require("./projects");
const rootRoutes = require("./root");

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/", rootRoutes);

module.exports = router;
