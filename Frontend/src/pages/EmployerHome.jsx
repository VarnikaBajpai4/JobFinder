// src/pages/EmployerHome.jsx

import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import JobListingCard from '../components/JobListingCard';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirectLogin';

const EmployerHome = () => {
  useAuthRedirect({ requiredRole: 'employer', redirectCondition: false, active: false });

  const [jobListings, setJobListings] = useState([]);
  const [showAddJobForm, setShowAddJobForm] = useState(false);

  useEffect(() => {
    // Logic to fetch job listings here, if needed
  }, []);

  const handleAddJob = () => {
    setShowAddJobForm(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h5" fontWeight="bold" component="div" sx={{ flexGrow: 1 }}>
            JobFinder
          </Typography>
          <Button color="inherit" component={Link} to="/employer-home">Home</Button>
          <Button color="inherit" component={Link} to="/employer-profile">User Profile</Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Employer Dashboard
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddJob} sx={{ mb: 3 }}>
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

      {showAddJobForm && <AddJobModal onClose={() => setShowAddJobForm(false)} />}
    </Box>
  );
};

export default EmployerHome;
