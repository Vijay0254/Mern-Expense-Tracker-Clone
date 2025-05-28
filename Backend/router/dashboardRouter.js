const express = require("express")
const router = express.Router()
const { getDashboardDataController } = require("../controller/dashboardController")
const verifyToken = require("../middleware/verifyToken")

router.get("/get/data", verifyToken, getDashboardDataController)

module.exports = router