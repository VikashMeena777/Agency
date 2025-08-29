const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authController.authMiddleware, authController.getUser);
router.put("/edit", authController.authMiddleware, authController.editProfile);
router.put("/change-password", authController.authMiddleware, authController.changePassword);

module.exports = router;