// src/pages/JobSeekerHome.jsx

import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container, Stack, Card, CardContent, Grid, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirectLogin';

const JobSeekerHome = () => {
  useAuthRedirect({ requiredRole: 'job_seeker', redirectCondition: false });

  const [jobListings, setJobListings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await axios.get('http://localhost/JobFinder/Backend/public/api.php', {
          params: { action: 'getJobListings' },
        });
        if (response.data.success) {
          setJobListings(response.data.data);
        } else {
          console.error('Failed to fetch job listings');
        }
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

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

  const handleViewDetails = async (jobId) => {
    try {
      const formData = new FormData();
      formData.append('action', 'getJobDetailsById');
      formData.append('job_id', jobId);

      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setSelectedJob(response.data.data);
        setModalOpen(true);
      } else {
        console.error('Failed to fetch job details');
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };


  const handleApply = async () => {
    if (!selectedJob) return;

    try {
      const formData = new FormData();
      formData.append('action', 'applyForJob');
      formData.append('job_id', selectedJob.job_id);

      const response = await axios.post(
        'http://localhost/JobFinder/Backend/public/api.php',
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('Application submitted successfully.');
      } else {
        alert(response.data.message || 'Failed to submit application.');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Error applying for job. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h5" fontWeight="bold" component="div" sx={{ flexGrow: 1 }}>
            JobFinder
          </Typography>
          <Button color="inherit" component={Link} to="/job-seeker-home">Home</Button>
          <Button color="inherit" component={Link} to="/job-seeker-track" sx={{ fontSize: '0.9rem', mx: 1 }}>Track Applications</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Available Job Listings
        </Typography>

        {jobListings.length > 0 ? (
          <Grid container spacing={4}>
            {jobListings.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.job_id}>
                <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{job.job_title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{job.company_name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{job.location}</Typography>
                    <Typography variant="body2" color="text.secondary">{job.job_description}</Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2, }} onClick={() => handleViewDetails(job.job_id)}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 3 }}>
            No job listings available.
          </Typography>
        )}

        {/* Modal for job details */}
        <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="job-details-modal" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ bgcolor: 'background.paper', p: 4, width: '80%', maxHeight: '80vh', overflowY: 'auto', borderRadius: 2 }}>
            {selectedJob && (
              <>
                <Typography variant="h5" fontWeight="bold" gutterBottom>{selectedJob.job_title}</Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>{selectedJob.company_name}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>{selectedJob.location}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>Experience Required: {selectedJob.min_experience} years</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>Salary: {selectedJob.salary}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>Employment Type: {selectedJob.employment_type}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>Description: {selectedJob.job_description}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleApply}>Apply Now</Button>
                <Button variant="contained" color="primary" onClick={handleCloseModal} sx={{ mt: 3 }}>
                  Close
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default JobSeekerHome;

