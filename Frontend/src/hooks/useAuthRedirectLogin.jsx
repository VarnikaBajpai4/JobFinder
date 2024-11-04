// src/hooks/useAuthRedirectLogin.js

import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = ({ requiredRole, redirectCondition, active = true }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!active) return; // Skip redirection logic if `active` is false

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

        if (userRole !== requiredRole) {
          navigate('/');
          return;
        }

        if (redirectCondition) {
          const detailsFormData = new FormData();
          detailsFormData.append(
            'action',
            userRole === 'job_seeker' ? 'checkJobSeekerDetails' : 'checkEmployerDetails'
          );

          const detailsResponse = await axios.post(
            'http://localhost/JobFinder/Backend/public/api.php',
            detailsFormData,
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
  }, [requiredRole, redirectCondition, active, navigate]);
};

export default useAuthRedirect;
