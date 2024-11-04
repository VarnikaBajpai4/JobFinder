import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import useAuthRedirect from '../hooks/useAuthRedirectLogin'; 

const EmployerDetails = () => {
  const navigate = useNavigate();
  useAuthRedirect({ requiredRole: 'employer', redirectCondition: true });



  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');

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
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper elevation={3} className="p-8 max-w-lg w-full rounded-md">
        <Typography className="text-2xl font-bold text-gray-800 mb-6">
          Employer Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <TextField
              label="Company Name"
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-gray-100"
              InputLabelProps={{ className: "text-gray-700" }}
            />
            <TextField
              label="Location"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-100"
              InputLabelProps={{ className: "text-gray-700" }}
            />
            <TextField
              label="Company Description"
              fullWidth
              multiline
              rows={4}
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="bg-gray-100"
              InputLabelProps={{ className: "text-gray-700" }}
            />
            <Button type="submit" fullWidth className="bg-gray-800 text-white hover:bg-gray-900">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
  
};

export default EmployerDetails;
