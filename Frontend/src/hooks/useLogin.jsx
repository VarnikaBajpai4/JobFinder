import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin = (isLoggedIn) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return; 

    const checkAuthStatus = async () => {
      try {
        const formData = new FormData();
        formData.append('action', 'checkAuthStatus');
        
        const authResponse = await axios.post(
          'http://localhost/JobFinder/Backend/public/api.php',
          formData,
          { withCredentials: true }
        );

        if (!authResponse.data.success) {
          navigate('/');
          return;
        }

        const userRole = authResponse.data.role;

        if (userRole === 'job_seeker') {
          const seekerDetailsFormData = new FormData();
          seekerDetailsFormData.append('action', 'checkJobSeekerDetails');
          
          const seekerDetailsResponse = await axios.post(
            'http://localhost/JobFinder/Backend/public/api.php',
            seekerDetailsFormData,
            { withCredentials: true }
          );

          if (seekerDetailsResponse.data.hasDetails) {
            navigate('/job-seeker-home');
          } else {
            navigate('/job-seeker-details');
          }
        } else if (userRole === 'employer') {
          const employerDetailsFormData = new FormData();
          employerDetailsFormData.append('action', 'checkEmployerDetails');
          
          const employerDetailsResponse = await axios.post(
            'http://localhost/JobFinder/Backend/public/api.php',
            employerDetailsFormData,
            { withCredentials: true }
          );

          if (employerDetailsResponse.data.hasDetails) {
            navigate('/employer-home');
          } else {
            navigate('/employer-details');
          }
        }
      } catch (error) {
        console.error('Error in auth redirection:', error);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn, navigate]);
};

export default useLogin;
