import express from "express";
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

// Create a new hotel
router.post("/creatHotel", createHotel);

// Get all hotels
router.get("/getAllHotel", getHotels);

// Get a single hotel by ID
router.get("/getHotelById/:id", getHotelById);

// Update a hotel by ID
router.put("/updateHotelById/:id", updateHotel);

// Delete a hotel by ID
router.delete("/deleteHotelById/:id", deleteHotel);

export default router;