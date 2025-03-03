import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import instance from '../datatable/axios'; // Import the custom axios instance
import './datatable.scss'; // Import the SCSS file
import UpdateHotelModal from './UpdateHotelModal'; // Import the UpdateHotelModal component
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const HotelDatatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all hotels
  const fetchHotels = async () => {
    try {
      const response = await instance.get('/hotels/getAllHotel'); // Use the custom axios instance
      console.log('API Response:', response); // Log the response
      if (Array.isArray(response.data)) {
        setData(response.data.map((item, index) => ({ ...item, id: item._id || index }))); // Add a unique `id` field
      } else {
        setData([]); // Set empty array if no data
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Failed to fetch hotels');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchHotels(); // Fetch hotels on component mount
  }, []);

  // Delete a hotel
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await instance.delete(`/hotels/deleteHotelById/${id}`); // Use the custom axios instance
          setData((prevData) => prevData.filter((item) => item.id !== id)); // Remove the deleted hotel from the table
          Swal.fire('Deleted!', 'The hotel has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting hotel:', error);
          Swal.fire('Error!', 'Failed to delete the hotel.', 'error');
        }
      }
    });
  };

  // Open update modal
  const handleView = (hotel) => {
    setSelectedHotel(hotel); // Set the selected hotel
    setIsModalOpen(true); // Open the modal
  };

  // Refetch hotels after update
  const handleUpdate = () => {
    fetchHotels(); // Refetch hotels after updating
    setIsModalOpen(false); // Close the modal
  };

  // Columns for the datatable
  const hotelColumns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'distance', headerName: 'Distance', width: 100 },
    {
      field: 'photos',
      headerName: 'Photos',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Hotel"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    { field: 'cheapestPrice', headerName: 'Price', width: 100 },
    {
      field: 'featured',
      headerName: 'Featured',
      width: 100,
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.value ? 'active' : 'passive'}`}>
          {params.value ? 'Yes' : 'No'}
        </div>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <div className="cellAction">
          <button className="viewButton" onClick={() => handleView(params.row)}>
            View
          </button>
          <button className="deleteButton" onClick={() => handleDelete(params.row.id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        List of Hotels
        <Link to="/admin/hotels/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data} // Pass the fetched data here
        columns={hotelColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id} // Use `id` as the unique identifier
      />
      {isModalOpen && selectedHotel && (
        <UpdateHotelModal
          hotel={selectedHotel} // Pass the selected hotel to the modal
          onClose={() => setIsModalOpen(false)} // Close the modal
          onUpdate={handleUpdate} // Refetch hotels after updating
        />
      )}
    </div>
  );
};

export default HotelDatatable;