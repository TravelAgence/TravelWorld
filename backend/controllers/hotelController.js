import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Create a new hotel
export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("rooms");
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("rooms");
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a hotel by ID
export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a hotel by ID
export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};