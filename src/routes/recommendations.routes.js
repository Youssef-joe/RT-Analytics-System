const express = require("express");
const router = express.Router();
const recommendationsController = require("./../controllers/recommendations.controller.js");

router.get("/", recommendationsController.getRecommendations);

module.exports = router;
