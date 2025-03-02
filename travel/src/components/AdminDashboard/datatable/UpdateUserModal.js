import React, { useState } from 'react';
import axios from './axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

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
      const data = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append image file (use correct field name: 'photo')
      if (selectedFile) {
        data.append("photo", selectedFile);
      }

      // Update the user with the new data
      const token = localStorage.getItem('token'); // Get the token from local storage
      await axios.put(`/users/${user._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Utilisateur mis à jour avec succès!',
      });

      onUpdate(); // Trigger update in parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Échec de la mise à jour de l\'utilisateur.',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mettre à jour l'utilisateur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Nom d'utilisateur</Form.Label>
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
            <Form.Label>Mot de passe (laisser vide pour conserver l'actuel)</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="photo">
            <Form.Label>Photo de profil</Form.Label>
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
                  alt="Profil actuel"
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Rôle</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="user">Utilisateur</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="isActive">
            <Form.Check
              type="checkbox"
              name="isActive"
              label="Actif"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="activationCode">
            <Form.Label>Code d'activation</Form.Label>
            <Form.Control
              type="text"
              name="activationCode"
              value={formData.activationCode}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={uploading}>
            {uploading ? 'Téléchargement...' : 'Mettre à jour'}
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2">
            Annuler
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateUserModal;