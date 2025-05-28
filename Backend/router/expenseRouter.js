const express = require("express")
const router = express.Router()
const { addExpenseController, deleteExpenseController, getAllExpenseController, downloadExpenseController } = require("../controller/expenseController")
const verifyToken = require("../middleware/verifyToken")

router.post("/add", verifyToken, addExpenseController)
router.delete("/delete/:id", verifyToken, deleteExpenseController)
router.get("/get/all", verifyToken, getAllExpenseController)
router.get("/download", verifyToken, downloadExpenseController)

module.exports = router