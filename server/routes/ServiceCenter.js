// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers
 
const {
  createServiceCenter,
  deleteServiceCenter,
  getServiceCenterDetails,
} = require("../controllers/ServiceCenter")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")

// Importing Middlewares
const { auth, isServiceCenter, isVisitor, isAdmin} = require("../middlewares/auth")


// ********************************************************************************************************
//                                      ServiceCenter routes
// ********************************************************************************************************

router.post("/createServiceCenter", auth, isServiceCenter, createServiceCenter)
router.post("/deleteServiceCenter", auth, isServiceCenter, deleteServiceCenter)
router.post("/getServiceCenterDetails", getServiceCenterDetails)
 

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isVisitor, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router