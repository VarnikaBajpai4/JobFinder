import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = ({ requiredRole, redirectCondition }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authResponse = await axios.post(
          'http://localhost/JobFinder/Backend/public/api.php',
          new FormData().append('action', 'checkAuthStatus'),
          { withCredentials: true }
        );

        if (!authResponse.data.success) {
          navigate('/');
          return;
        }

        const userRole = authResponse.data.role;

        if (userRole !== requiredRole) {
          navigate('/');
          return;
        }

        if (redirectCondition) {
          const detailsResponse = await axios.post(
            'http://localhost/JobFinder/Backend/public/api.php',
            new FormData().append('action', userRole === 'job_seeker' ? 'checkJobSeekerDetails' : 'checkEmployerDetails'),
            { withCredentials: true }
          );

          if (detailsResponse.data.hasDetails) {
            navigate(userRole === 'job_seeker' ? '/job-seeker-home' : '/employer-home');
          } else {
            navigate(userRole === 'job_seeker' ? '/job-seeker-details' : '/employer-details');
          }
        }
      } catch (error) {
        console.error('Error in auth redirection:', error);
      }
    };

    checkAuthStatus();
  }, [requiredRole, redirectCondition, navigate]);
};

export default useAuthRedirect;
