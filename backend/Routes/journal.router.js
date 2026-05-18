const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const  {addJournalcontoller,getSingleJournalcontroller,deleteJournalcontroller,getMyJournalcontroller,updateJournalcontroller} = require("../controllers/journal.controller")
const router = express.Router()

router.post("/add", authMiddleware,addJournalcontoller)
router.get("/getall", authMiddleware,getMyJournalcontroller)
router.get("/getsingle/:id", authMiddleware,getSingleJournalcontroller)
router.put("/update/:id", authMiddleware,updateJournalcontroller)
router.delete("/delete/:id", authMiddleware,deleteJournalcontroller)


module.exports = router