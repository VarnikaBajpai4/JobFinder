import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useEmployerAuthCheck = () => {
    const navigate = useNavigate();

    const checkAuth = async () => {
        const formData = new FormData();
        formData.append('action', 'checkAuthEmployer');

        try {
            const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
                withCredentials: true,
            });

            console.log('Employer Auth check response:', response.data);

            if (response.data.success) {
                // If authenticated and role is not employer, redirect to job seeker details
                if (response.data.user.role !== 'employer') {
                    console.log('User is not an employer, redirecting to job seeker details');
                    navigate('/job-seeker-details');
                }
                return response.data.user; // Return user data if needed
            } else {
                // User ID is not set
                console.log('User not authenticated, redirecting to landing page');
                navigate('/');
                return null;
            }
        } catch (error) {
            console.error('Error during Employer authentication check:', error);
            return null;
        }
    };

    return checkAuth; // Ensure this returns the function
};

export default useEmployerAuthCheck;
