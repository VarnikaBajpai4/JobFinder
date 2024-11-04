// src/pages/SeekerProfile.jsx
import React from 'react';
import axios from 'axios';
import { Button, Box, Typography } from '@mui/material';


const SeekerProfile = () => {
  const handleLogout = async () => {
    const formData = new FormData();
    formData.append('action', 'logout');

    try {
      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.data.success) {
        alert('Logged out successfully');
        // Redirect to landing page or handle logout actions
        window.location.href = '/';
      } else {
        alert('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred while logging out.');
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Job Seeker Profile
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default SeekerProfile;
