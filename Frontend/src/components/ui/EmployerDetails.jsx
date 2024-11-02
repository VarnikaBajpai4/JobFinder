import React, { useState,useEffect} from 'react';
import axios from 'axios';
import useAuthCheck from '../../hooks/useAuthCheck';


import { Box, Button, TextField, Typography, FormControl, InputLabel, MenuItem, Select, Paper, Stack } from '@mui/material';

const EmployerDetails = () => {
  const checkAuth = useAuthCheck();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');
  const [workArrangement, setWorkArrangement] = useState('');
  const [experienceYears, setExperienceYears] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(); // Use FormData for sending data
    formData.append('action', 'saveEmployerDetails');
    formData.append('companyName', companyName);
    formData.append('jobTitle', jobTitle);
    formData.append('jobDescription', jobDescription);
    formData.append('location', location);
    formData.append('workArrangement', workArrangement);
    formData.append('experienceYears', experienceYears);
  
    try {
      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Set content type for FormData
        withCredentials: true,
      });
  
      console.log(response.data);
      alert(response.data.success ? 'Employer details saved successfully' : 'Failed to save employer details');
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
              label="Job Title"
              fullWidth
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <TextField
              label="Job Description"
              fullWidth
              multiline
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <TextField
              label="Location"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel>Work Arrangement</InputLabel>
              <Select
                value={workArrangement}
                onChange={(e) => setWorkArrangement(e.target.value)}
                label="Work Arrangement"
              >
                <MenuItem value="onsite">On-site</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Experience Years of Candidate"
              fullWidth
              type="number"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
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
