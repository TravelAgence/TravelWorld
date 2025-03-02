import express from "express";
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  countByCity
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new hotel
router.post("/creatHotel",verifyAdmin ,createHotel);

// Get all hotels
router.get("/getAllHotel", verifyAdmin , getHotels);

// get  hotels by city
router.get("/countByCity", verifyAdmin, countByCity);

// get  hotels by type 
router.get("/countByType", verifyAdmin , getHotels);


// Get a single hotel by ID
router.get("/getHotelById/:id", verifyAdmin , getHotelById);

// Update a hotel by ID
router.put("/updateHotelById/:id", verifyAdmin , updateHotel);

// Delete a hotel by ID
router.delete("/deleteHotelById/:id", verifyAdmin , deleteHotel);



export default router;