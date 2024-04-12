// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers
 
const {
  createServiceCenter,
  deleteServiceCenter,
  getServiceCenterDetails,
  getAllServicesOfOwner,
  editService,
  getServiceDetails,
  getAllServices,
} = require("../controllers/ServiceCenter")

// Importing Middlewares
const { auth, isServiceCenter, isVisitor, isAdmin} = require("../middlewares/auth")


// ********************************************************************************************************
//                                      ServiceCenter routes
// ********************************************************************************************************

router.post("/createServiceCenter", auth, isServiceCenter, createServiceCenter)
router.post("/deleteServiceCenter", auth, isServiceCenter, deleteServiceCenter)
router.get("/getServiceCenterDetails", getServiceCenterDetails)
router.get("/getAllServicesOfOwner", auth, isServiceCenter, getAllServicesOfOwner)
router.post("/editService", auth, isServiceCenter, editService)
router.post("/getServiceDetails", auth, isServiceCenter, getServiceDetails)
router.post("/getAllServices", auth, getAllServices)

module.exports = router