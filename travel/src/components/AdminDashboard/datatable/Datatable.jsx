import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from './axios';
import './datatable.scss';
import UpdateUserModal from './UpdateUserModal';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
      setError('Échec de la récupération des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas annuler cela!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/users/${id}`);
          setData((prevData) => prevData.filter((item) => item._id !== id));
          Swal.fire(
            'Supprimé!',
            'L\'utilisateur a été supprimé.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire(
            'Erreur!',
            'Échec de la suppression de l\'utilisateur.',
            'error'
          );
        }
      }
    });
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
    { field: 'username', headerName: 'Nom d\'utilisateur', width: 150 },
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
    { field: 'role', headerName: 'Rôle', width: 150 }, // Added role column
    { field: 'activationCode', headerName: 'Code d\'activation', width: 200 },
    {
      field: 'isActive',
      headerName: 'Statut',
      width: 150,
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.value ? 'active' : 'passive'}`}>
          {params.value ? 'Actif' : 'Inactif'}
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
            Voir
          </button>
          <button className="deleteButton" onClick={() => handleDelete(params.row._id)}>
            Supprimer
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Liste des utilisateurs
        <Link to="/admin/users/new" className="link">
          Ajouter un nouveau
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