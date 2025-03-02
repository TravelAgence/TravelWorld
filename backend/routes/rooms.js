import express from "express";
import { createRoom
    , getRooms
    , getRoomById
    , updateRoom
    , deleteRoom  
 } from "../controllers/roomControllers.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new hotel
router.post("/createRoom/:hotelid", verifyAdmin, createRoom);

// Get all hotels
router.get("/getRooms", verifyAdmin , getRooms);

// Get a single hotel by ID
router.get("/getRoomById/:id", verifyAdmin , getRoomById);

// Update a hotel by ID
router.put("/updateRoom/:id", verifyAdmin , updateRoom);

// Delete a hotel by ID
router.delete("/deleteRoom/:hotelid", verifyAdmin , deleteRoom);

export default router;