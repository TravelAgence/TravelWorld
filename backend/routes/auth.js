import express from "express";
import { login, register, verifyUser , getMe } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifyuser/:activationCode", verifyUser);
router.get("/me", verifyToken, getMe);


export default router;