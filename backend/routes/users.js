import express from 'express';
import { createUser, getAllUsers, deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

// Create a new user (Admin only)
router.post('/',  createUser);

// Get all users (Admin only)
router.get('/',  getAllUsers);

// Delete a user (Admin only)
router.delete('/:id',  deleteUser);

// Update a user (Admin only)
router.put('/:id',  updateUser);

export default router;