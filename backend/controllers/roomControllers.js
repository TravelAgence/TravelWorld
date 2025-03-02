import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
    const room = new Room(req.body);
  
    try {
      const savedRoom = await room.save();
      
      const updatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        { $push: { rooms: savedRoom._id } },
        { new: true, useFindAndModify: false } // Ensure you get the updated document
      );
  
      if (!updatedHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      res.status(201).json(savedRoom);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
  
    try {
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      const updatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        { $pull: { rooms: req.params.id } },
        { new: true }
      );
  
      if (!updatedHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      await room.deleteOne();
      res.status(200).json({ message: "Room deleted and removed from hotel." });
  
    } catch (err) {
      res.status(500).json(err);
    }
  };
  