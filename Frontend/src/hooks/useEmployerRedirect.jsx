// src/hooks/useEmployerRedirect.js
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useEmployerRedirect = () => {
  const navigate = useNavigate();

  const checkEmployerDetails = async () => {
    const formData = new FormData();
    formData.append('action', 'checkEmployerDetails');

    try {
      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        if (response.data.exists) {
          // Redirect to employer home if details exist
          navigate('/employer-home', { replace: true });
        } else {
          // Redirect to employer details form if details do not exist
          navigate('/employer-details', { replace: true });
        }
      } else {
        console.error('Error: User not authenticated.');
      }
    } catch (error) {
      console.error('Error checking employer details:', error);
    }
  };

  useEffect(() => {
    checkEmployerDetails();
  }, []);

  return checkEmployerDetails;
};

export default useEmployerRedirect;
