// src/pages/EmployerHome.jsx
import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import JobListingCard from '../components/JobListingCard';
import AddJobModal from '../components/AddJobModal';
import axios from 'axios';

const EmployerHome = () => {
  const [jobListings, setJobListings] = useState([]);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  const fetchJobListings = async () => {
    try {
      const formData = new FormData();
      formData.append('action', 'getEmployerJobListings');
      
      const response = await axios.post(
        'http://localhost/JobFinder/Backend/public/api.php',
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setJobListings(response.data.data);
      } else {
        console.error('Failed to fetch job listings:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  useEffect(() => {
    fetchJobListings();
  }, []);

  const handleAddJob = () => {
    setShowAddJobModal(true);
  };

  const handleJobAdded = () => {
    setShowAddJobModal(false);
    fetchJobListings(); // Refresh job listings after adding a new job
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', top: 0 }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px' }}>
          <Typography variant="h5" fontWeight="bold" component="div">
            JobFinder
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/employer-home" sx={{ fontSize: '0.9rem', mx: 1 }}>Home</Button>
            <Button color="inherit" component={Link} to="/track-applications" sx={{ fontSize: '0.9rem', mx: 1 }}>Track Applications</Button>
            <Button color="inherit" component={Link} to="/employer-profile" sx={{ fontSize: '0.9rem', mx: 1 }}>User Profile</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Employer Dashboard
        </Typography>

        <Button variant="outlined" color="primary" onClick={handleAddJob} sx={{ mb: 3, fontSize: '0.9rem', px: 2, py: 1 }}>
          Add Job Listing
        </Button>

        {jobListings.length === 0 ? (
          <Paper elevation={1} sx={{ p: 3, mt: 2, textAlign: 'center', maxWidth: 500 }}>
            <Typography variant="h6">No job listings available.</Typography>
            <Typography variant="body2">Click "Add Job Listing" to post a new job.</Typography>
          </Paper>
        ) : (
          <Stack spacing={2} sx={{ width: '100%', maxWidth: 800 }}>
            {jobListings.map((job) => (
              <JobListingCard key={job.id} job={job} />
            ))}
          </Stack>
        )}

        {showAddJobModal && (
          <AddJobModal onClose={() => setShowAddJobModal(false)} onJobAdded={handleJobAdded} />
        )}
      </Box>
    </Box>
  );
};

export default EmployerHome;
