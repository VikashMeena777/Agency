const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  editProfile,
  changePassword,
  authMiddleware
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleware, getUser);
router.post("/edit-profile", authMiddleware, editProfile);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;