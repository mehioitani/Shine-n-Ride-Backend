import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

// @desc    Create new admin
// @route   POST /api/admins
// @access  Public
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if admin exists
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  // Create admin
  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    // Return only necessary data in response
    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// @desc    Authenticate a admin
// @route   POST /api/admins/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for admin email
  const admin = await Admin.findOne({ email });

  if (admin && (await admin.comparePassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get admin data
// @route   GET /api/admins/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.admin);
});

// Generate JWT
const generateToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
