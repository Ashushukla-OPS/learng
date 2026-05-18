const express = require("express")
const router = express.Router()
const searchcontroller = require("../controllers/search.controller")
const authMiddleware = require("../middleware/auth.middleware")




router.get("/search", authMiddleware, searchcontroller)
module.exports = router