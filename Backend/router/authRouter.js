const express = require("express")
const router = express.Router()
const { signupController, loginController, logoutController, verifyTokenController } = require('../controller/authController')
const verifyToken = require("../middleware/verifyToken")
const upload = require('../utils/multer')

router.post("/signup", upload.fields([{name: 'profileImg', maxCount: 1}]), signupController)
router.post("/login", loginController)
router.post("/logout", logoutController)
router.get("/verify/token", verifyToken, verifyTokenController)

module.exports = router