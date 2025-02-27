import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from './axios';
import './datatable.scss';
import UpdateUserModal from './UpdateUserModal';
import { Link } from 'react-router-dom';

const Datatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users/');
      if (response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    fetchUsers(); // Refetch users after update
  };

  const userColumns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'photo',
      headerName: 'Photo',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="User"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },
    { field: 'role', headerName: 'Role', width: 150 }, // Added role column
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
          <button className="viewButton" onClick={() => handleView(params.row)}>
            View
          </button>
          <button className="deleteButton" onClick={() => handleDelete(params.row._id)}>
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
        User List
        <Link to="/admin/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
      {isModalOpen && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Datatable;