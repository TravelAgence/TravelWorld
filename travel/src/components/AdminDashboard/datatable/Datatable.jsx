import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from './axios'; // Custom Axios instance
import './datatable.scss'; // Importing styles

const Datatable = () => {
  const [data, setData] = useState([]); // Ensure state starts as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users/');
        console.log('Fetched users:', response.data); // Debugging API response

        // Ensure we always set an array
        if (response.data && Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          setData([]); // Fallback to empty array
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const userColumns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'activationCode', headerName: 'Activation Code', width: 200 },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.value ? 'active' : 'passive'}`}>
          {params.value ? 'Active' : 'Inactive'}
        </div>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <div className="cellAction">
          <button className="viewButton">View</button>
          <button className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        User List
        <a href="/add-user" className="link">Add New</a>
      </div>
      <DataGrid
        rows={data} // Ensured this is always an array
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id} // Ensure unique row ID
      />
    </div>
  );
};

export default Datatable;
