// Import the required modules
const express = require("express")
const router = express.Router()

//Import controllers
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Import middlewares
const { auth, isAdmin } = require("../middlewares/auth")
// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", auth, showAllCategories)
router.post("/getCategoryPageDetails", auth, categoryPageDetails)

module.exports = router