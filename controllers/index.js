const router = require("express").Router();
const express = require("express");

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;
