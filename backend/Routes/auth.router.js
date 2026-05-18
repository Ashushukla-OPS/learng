const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const {registerController, logoutcontroller,loginController,getmecontroller,forgetpasswordcontroller,resetPasscontroller} = require("../controllers/register.controller")
const router = express.Router()

router.post("/register",registerController)
router.post("/login", loginController)
router.get("/me",authMiddleware,getmecontroller)
router.post("/logout",authMiddleware,logoutcontroller)
router.post("/forgetPass",forgetpasswordcontroller)
router.post("/resetPass/:token",resetPasscontroller )
module.exports = router