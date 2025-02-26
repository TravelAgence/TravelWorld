import express from "express";
import { submitVisaRequest, getVisaRequests } from "../controllers/visaController.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.post("/submit", upload.single('passportImage'), submitVisaRequest);
router.get("/visa-requests", getVisaRequests); // New route to fetch all requests

export default router;
