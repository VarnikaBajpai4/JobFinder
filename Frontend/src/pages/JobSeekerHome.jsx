// src/pages/JobSeekerHome.jsx
import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container, Stack, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobSeekerHome = () => {
  const [jobListings, setJobListings] = useState([]);
  const [userRole, setUserRole] = useState('');

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

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h5" fontWeight="bold" component="div" sx={{ flexGrow: 1 }}>
            JobFinder
          </Typography>
          <Button color="inherit" component={Link} to="/job-seeker-home">Home</Button>
          <Button color="inherit" component={Link} to="/track-applications">Track Applications</Button>
          <Button color="inherit" component={Link} to="/seeker-profile">User Profile</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          {userRole === 'employer' ? 'Manage Your Job Listings' : 'Available Job Listings'}
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
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      onClick={() => window.location.href = `/job/${job.job_id}`}
                      sx={{ mr: 1 }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 3 }}>
            No job listings available.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default JobSeekerHome;
