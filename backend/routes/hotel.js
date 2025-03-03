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
router.post("/creatHotel" ,createHotel);

// Get all hotels
router.get("/getAllHotel",  getHotels);

// get  hotels by city
router.get("/countByCity",  countByCity);

// get  hotels by type 
router.get("/countByType",  getHotels);


// Get a single hotel by ID
router.get("/getHotelById/:id",  getHotelById);

// Update a hotel by ID
router.put("/updateHotelById/:id", updateHotel);

// Delete a hotel by ID
router.delete("/deleteHotelById/:id",  deleteHotel);



export default router;