import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    let imageUrl = null;
    
    // Check if file was uploaded
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary automatically provides the image URL
    }

    const newUser = new User({
      ...req.body,
      photo: imageUrl, // Save image URL in the 'photo' field
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully', data: newUser });

  } catch (err) {
    console.error("❌ Error creating user:", err);
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
// export const updateUser = async (req, res) => {
//   try {
//     let imageUrl = req.body.photo;

//     // If a new file is uploaded, update the photo URL
//     if (req.file) {
//       imageUrl = req.file.path; // Cloudinary automatically provides the image URL
//     }

//     // Update the user with the new data and photo URL
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body, photo: imageUrl }, // Include the updated photo URL
//       { new: true }
//     );
    
//     res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Failed to update user' });
//   }
// };

// Update a user
// export const updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Failed to update user' });
//   }
// };

// Update a user
export const updateUser = async (req, res) => {
  try {
    let imageUrl = req.body.photo;

    // If a new file is uploaded, update the photo URL
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary automatically provides the image URL
    }

    // Update the user with the new data and photo URL
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, photo: imageUrl }, // Include the updated photo URL
      { new: true }
    );
    
    res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};