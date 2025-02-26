import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../nodeMailer/nodeMailer.js";

// User Registration
export const register = async (req, res) => {
  try {
    const { username, email, password, photo, role } = req.body;

    const activationCode = [...Array(25)]
      .map(() => Math.random().toString(36)[2])
      .join("");

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hash,
      photo,
      role: role || "user",
      activationCode,
    });

    await newUser.save();
    await sendEmail(email, activationCode);

    res.status(200).json({
      success: true,
      message: "User registered. Check email to activate your account.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed." });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account not activated. Check your email.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Include all necessary user data in the token payload
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
        photo: user.photo,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, role: user.role, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Verify User
export const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({ activationCode: req.params.activationCode });

    if (!user) {
      return res.status(400).json({ message: "Invalid activation code" });
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({ message: "Account successfully activated" });
  } catch (err) {
    res.status(500).json({ message: "Activation failed" });
  }
};

// Get me from token
export const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get user data." });
  }
};