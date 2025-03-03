import React, { useState } from 'react';
import instance from '../datatable/axios'; // Import the custom axios instance
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const UpdateHotelModal = ({ hotel, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: hotel.name,
    city: hotel.city,
    address: hotel.address,
    distance: hotel.distance,
    photos: hotel.photos,
    title: hotel.title,
    description: hotel.description,
    rating: hotel.rating,
    cheapestPrice: hotel.cheapestPrice,
    featured: hotel.featured,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.put(`/hotels/updateHotelById/${hotel._id}`, formData); // Use the custom axios instance
      Swal.fire('Success!', 'Hotel updated successfully.', 'success');
      onUpdate(); // Refetch hotels after updating
    } catch (error) {
      console.error('Error updating hotel:', error);
      Swal.fire('Error!', 'Failed to update the hotel.', 'error');
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Hotel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Distance</Form.Label>
            <Form.Control
              type="text"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="Distance"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Photos</Form.Label>
            <Form.Control
              type="text"
              name="photos"
              value={formData.photos}
              onChange={handleChange}
              placeholder="Photos"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="cheapestPrice"
              value={formData.cheapestPrice}
              onChange={handleChange}
              placeholder="Price"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="featured"
              label="Featured"
              checked={formData.featured}
              onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateHotelModal;