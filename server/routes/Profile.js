const express = require("express")
const router = express.Router()

const {
    getUserDetails,
    updateDisplayPicture,
} = require("../controllers/Profile")

const { auth } = require("../middlewares/auth")

router.get("/getUserDetails", auth, getUserDetails)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router