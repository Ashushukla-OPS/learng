const express = require("express")
const dashboardcontroller = require("../controllers/dashboard.controller")
const authMiddleware = require("../middleware/auth.middleware")
const router = express.Router()
router.get("/dashboard",authMiddleware,dashboardcontroller)

module.exports = router