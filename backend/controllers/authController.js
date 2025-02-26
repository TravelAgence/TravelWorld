import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../nodeMailer/nodeMailer.js"; // Import the sendEmail function


// User Registration
export const register = async (req, res) => {
    try {
      const { username, email, password, photo, role } = req.body;
  
      // Generate activation code
      const activationCode = [...Array(25)]
        .map(() => Math.random().toString(36)[2])
        .join("");
  
      // Hash password
      const hash = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        email,
        password: hash,
        photo,
        role: role || "user", // Default to "user" if role is not provided
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
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
      );
  
      res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      });
  
      res.status(200).json({ token, role: user.role, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: "Login failed" });
    }
  };



  // verify email

export const verifyUser = async (req, res) => {
  User.find({activationCode: req.params.activationCode})
   .then((user)=>{
    if(!user){
      res.send({
        message: "Ce code d'activation n'est pas valide"
      })
    }

    user.isActive = true;
    user.save();
    res.send({
      message: "Votre compte a été activé avec succès"
    })

    })
    
  }