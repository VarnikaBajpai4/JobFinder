// src/pages/EmployerHome.jsx
import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Paper, Stack, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
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
        window.location.href = '/';
      } else {
        alert('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred while logging out.');
    }
  };

  const handleAddJob = () => {
    setShowAddJobModal(true);
  };

  const handleJobAdded = () => {
    setShowAddJobModal(false);
    fetchJobListings();
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
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
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
          <Grid container spacing={4} sx={{ width: '100%', maxWidth: 800 }}>
            {jobListings.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{job.job_title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{job.company_name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{job.location}</Typography>
                    <Typography variant="body2" color="text.secondary">{job.job_description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {showAddJobModal && (
          <AddJobModal onClose={() => setShowAddJobModal(false)} onJobAdded={handleJobAdded} />
        )}
      </Box>
    </Box>
  );
};

export default EmployerHome;
