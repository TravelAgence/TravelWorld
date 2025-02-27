import User from '../models/User.js';

// Create a new user (Admin only)
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create user' });
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

// Delete a user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};

// Update a user (Admin only)
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};