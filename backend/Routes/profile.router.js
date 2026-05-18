const express = require("express")
const router = express.Router()
const  {profilecontroller ,updateProfileController} = require("../controllers/profile.controller")
const authMiddleware = require("../middleware/auth.middleware")
console.log("authMiddleware:", authMiddleware);
console.log("profilecontroller:", profilecontroller);
console.log("updateProfileController:", updateProfileController);
router.get("/me", authMiddleware, profilecontroller);
router.patch("/update", authMiddleware, updateProfileController);

module.exports = router