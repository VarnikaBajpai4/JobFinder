// src/components/EmployerDetails.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import useEmployerAuthCheck from '../hooks/useEmployerAuthCheck';

const EmployerDetails = () => {
  const checkAuth = useEmployerAuthCheck(); // Initialize the auth check hook
  const navigate = useNavigate();

  // Form handling state
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');

  // Run authentication check on mount
  useEffect(() => {
    const authenticateUser = async () => {
      const user = await checkAuth(); // This will handle redirection if needed
      if (!user) {
        console.log('User not authenticated or not an employer. Redirected.');
      }
    };

    authenticateUser();
  }, [checkAuth]); // Dependency array includes checkAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('action', 'saveEmployerDetails');
    formData.append('companyName', companyName);
    formData.append('location', location);
    formData.append('companyDescription', companyDescription);

    try {
      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.data.success) {
        navigate('/employer-home');
      } else {
        console.log('Failed to save employer details:', response.data.message);
        alert('Failed to save employer details');
      }
    } catch (error) {
      console.error('Error submitting employer details:', error);
      alert('An error occurred while submitting employer details.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Employer Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Company Name"
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              label="Location"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
              label="Company Description"
              fullWidth
              multiline
              rows={4}
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
            />
            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default EmployerDetails;
