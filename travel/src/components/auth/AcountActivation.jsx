import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function AccountActivation() {
  const { activationCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.post(`http://localhost:4000/api/v1/auth/verifyuser/${activationCode}`);
        console.log(response.data);
        swal("Success", response.data.message, "success").then(() => {
          navigate('/login'); // Redirect to login page after successful activation
        });
      } catch (error) {
        console.error('Error verifying user:', error);
        swal("Error", "Error verifying user", "error").then(() => {
          navigate('/register'); // Redirect to register page if activation fails
        });
      }
    };

    verifyUser();
  }, [activationCode, navigate]);

  return (
    <div>AccountActivation</div>
  );
}

export default AccountActivation;