import express from 'express';
import { createUser, getAllUsers, deleteUser, updateUser } from '../controllers/userController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.post("/create", upload.single("photo"), createUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id', upload.single("photo"), updateUser); // Ensure the upload middleware is used for updating the photo

export default router;