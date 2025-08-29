const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    if (!/^\S+@\S+\.\S+$/.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password too short" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });
    const user = await User.findByEmail(email);
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user: { name: user.name, email: user.email } });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });
    user.name = name;
    return res.json({ message: "Profile updated" });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ message: "Both passwords required" });
    const match = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Old password incorrect" });
    if (newPassword.length < 6) return res.status(400).json({ message: "New password too short" });
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    return res.json({ message: "Password updated" });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};
