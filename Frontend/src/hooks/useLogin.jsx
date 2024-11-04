import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin = (isLoggedIn) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return; // Only run if the user is logged in

    const checkAuthStatus = async () => {
      try {
        // Check if the user is logged in
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
          // Check if job seeker details are filled
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
          // Check if employer details are filled
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
  }, [isLoggedIn, navigate]); // Add isLoggedIn as a dependency
};

export default useLogin;
