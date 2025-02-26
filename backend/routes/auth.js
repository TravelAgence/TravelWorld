import express from "express";
import { login, register ,verifyUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifyuser/:activationCode", verifyUser);

export default router;
