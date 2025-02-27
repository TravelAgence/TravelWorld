import React, { useState } from 'react';
import axios from './axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateUserModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: '', // Password is optional for update
    photo: user.photo || '',
    role: user.role,
    isActive: user.isActive,
    activationCode: user.activationCode || '',
  });

  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [uploading, setUploading] = useState(false); // State to handle upload loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let photoUrl = formData.photo;

      // If a new file is selected, upload it to Cloudinary
      if (selectedFile) {
        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', selectedFile);
        formDataCloudinary.append('upload_preset', 'users'); // Replace with your Cloudinary upload preset

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formDataCloudinary
        );

        photoUrl = response.data.secure_url; // Get the uploaded image URL
      }

      // Update the user with the new data and new photo URL if uploaded
      const token = localStorage.getItem('token'); // Get the token from local storage
      await axios.put(`/users/${user._id}`, {
        ...formData,
        photo: photoUrl, // Include the new photo URL here
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });

      onUpdate(); // Trigger update in parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password (leave blank to keep current)</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="photo">
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.photo && (
              <div className="mt-2">
                <img
                  src={formData.photo}
                  alt="Current Profile"
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="user">User</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="isActive">
            <Form.Check
              type="checkbox"
              name="isActive"
              label="Active"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="activationCode">
            <Form.Label>Activation Code</Form.Label>
            <Form.Control
              type="text"
              name="activationCode"
              value={formData.activationCode}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Update'}
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateUserModal;
