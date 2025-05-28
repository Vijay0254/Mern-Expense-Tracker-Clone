const express = require("express")
const router = express.Router()
const { addIncomeController, deleteIncomeController, getAllIncomeController, downloadIncomeController } = require("../controller/incomeController")
const verifyToken = require("../middleware/verifyToken")

router.post("/add", verifyToken, addIncomeController)
router.delete("/delete/:id", verifyToken, deleteIncomeController)
router.get("/get/all", verifyToken, getAllIncomeController)
router.get("/download", verifyToken, downloadIncomeController)

module.exports = router