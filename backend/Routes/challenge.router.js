const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const getDailyChallengeController = require("../controllers/daily.challenge");

const router = express.Router();

router.get("/daily", authMiddleware, getDailyChallengeController);

module.exports = router;