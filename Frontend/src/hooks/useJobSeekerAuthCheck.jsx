import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useJobSeekerAuthCheck = () => {
    const navigate = useNavigate();

    const checkAuth = async () => {
        const formData = new FormData();
        formData.append('action', 'checkAuthJobSeeker');

        try {
            const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
                withCredentials: true,
            });

            console.log('Job Seeker Auth check response:', response.data);

            if (response.data.success) {
                // If authenticated and role is not job_seeker, redirect to employer details
                if (response.data.user.role !== 'job_seeker') {
                    console.log('User is not a job seeker, redirecting to employer details');
                    navigate('/employer-details');
                }
                return response.data.user; // Return user data if needed
            } else {
                // User ID is not set
                console.log('User not authenticated, redirecting to landing page');
                navigate('/');
                return null;
            }
        } catch (error) {
            console.error('Error during Job Seeker authentication check:', error);
            return null;
        }
    };

    return checkAuth; // Ensure this returns the function
};

export default useJobSeekerAuthCheck;
