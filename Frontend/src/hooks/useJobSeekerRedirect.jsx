// src/hooks/useJobSeekerRedirect.js
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useJobSeekerRedirect = () => {
  const navigate = useNavigate();

  const checkJobSeekerDetails = async () => {
    const formData = new FormData();
    formData.append('action', 'checkJobSeekerDetails');

    try {
      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        if (response.data.exists) {
          // Redirect to job seeker home if details exist
          navigate('/job-seeker-home', { replace: true });
        } else {
          // Redirect to job seeker details form if details do not exist
          navigate('/job-seeker-details', { replace: true });
        }
      } else {
        console.error('Error: User not authenticated.');
      }
    } catch (error) {
      console.error('Error checking job seeker details:', error);
    }
  };

  useEffect(() => {
    checkJobSeekerDetails();
  }, []);

  return checkJobSeekerDetails;
};

export default useJobSeekerRedirect;
