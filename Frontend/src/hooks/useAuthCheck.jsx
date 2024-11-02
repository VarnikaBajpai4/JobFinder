// src/hooks/useAuthCheck.js

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', {
        action: 'checkAuth'
      }, {
        withCredentials: true, // Include credentials for session checks
      });

      if (!response.data.success) {
        navigate('/'); // Redirect to landing page if not authenticated
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      navigate('/'); // Redirect on error as well
    }
  };

  return checkAuth;
};

export default useAuthCheck;
