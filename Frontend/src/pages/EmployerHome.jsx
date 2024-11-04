// src/pages/EmployerHome.jsx

import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import JobListingCard from '../components/JobListingCard';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirectLogin';

const EmployerHome = () => {
    // Only allow access if the user is an employer
    useAuthRedirect({ requiredRole: 'employer', redirectCondition: false });

    const [jobListings, setJobListings] = useState([]);
    const [showAddJobForm, setShowAddJobForm] = useState(false);

    useEffect(() => {
        // Logic to fetch job listings here, if needed
    }, []);

    const handleAddJob = () => {
        setShowAddJobForm(true);
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
                        <Button color="inherit" component={Link} to="/employer-home" sx={{ fontSize: '0.9rem', mx: 1 }}>Track Applications</Button>
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


                {showAddJobForm && <AddJobModal onClose={() => setShowAddJobForm(false)} />}
            </Box>
        </Box>
    );
};

export default EmployerHome;
