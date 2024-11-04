import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Paper, Stack, Container, Modal, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SeekerTrack = () => {
    const [applications, setApplications] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const formData = new FormData();
                formData.append('action', 'getSeekerApplications'); // Backend action for seeker applications

                const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setApplications(response.data.data);
                } else {
                    console.error('Failed to fetch applications:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const handleViewDetails = async (jobId) => {
        try {
            const formData = new FormData();
            formData.append('action', 'getJobDetails');
            formData.append('job_id', jobId);
    
            const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
                withCredentials: true,
            });
    
            if (response.data.success) {
                setSelectedJob(response.data.data);
                setOpen(true);
            } else {
                console.error('Failed to fetch job details:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching job details:', error);
        }
    };
    
    

    const handleClose = () => {
        setOpen(false);
        setSelectedJob(null);
    };

    const navigate = useNavigate();

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
                navigate('/');
            } else {
                alert('Failed to log out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            alert('An error occurred while logging out.');
        }
    };


    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <AppBar position="fixed" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', top: 0 }}>
                    <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px' }}>
                        <Typography variant="h5" fontWeight="bold" component="div">
                            JobFinder
                        </Typography>
                        <Box>
                            <Button color="inherit" component={Link} to="/job-seeker-home" sx={{ fontSize: '0.9rem', mx: 1 }}>
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to="/job-seeker-track" sx={{ fontSize: '0.9rem', mx: 1 }}>
                                Track Applications
                            </Button>
                            <Button color="inherit" onClick={handleLogout} sx={{ fontSize: '0.9rem', mx: 1 }}>
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Typography variant="h4" align="center" gutterBottom mt={8}>
                    Track Applications
                </Typography>

                {applications.length === 0 ? (
                    <Typography variant="body1" color="textSecondary" align="center">
                        No applications found for your job submissions.
                    </Typography>
                ) : (
                    <Stack spacing={2}>
                        {applications.map((application) => (
                            <Paper key={application.application_id} sx={{ p: 2 }}>
                                <Typography variant="h6">{application.job_title}</Typography>
                                <Typography variant="body2">Company: {application.company_name}</Typography>
                                <Typography variant="body2">Status: {application.application_status}</Typography>
                                <Typography variant="body2">Applied At: {new Date(application.applied_at).toLocaleString()}</Typography>
                                <Button variant="outlined" onClick={() => handleViewDetails(application.job_id)} sx={{ mt: 2 }}>
                                    View Details
                                </Button>
                            </Paper>
                        ))}
                    </Stack>
                )}

                {/* Modal for Job Details */}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 600, mx: 'auto', mt: '10vh', boxShadow: 24 }}>
                        {selectedJob ? (
                            <Stack spacing={2}>
                                <Typography variant="h6" align="center">
                                    Job Details
                                </Typography>
                                <Divider />
                                <Typography variant="body1">
                                    <strong>Title:</strong> {selectedJob.job_title}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Company:</strong> {selectedJob.company_name}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Location:</strong> {selectedJob.location}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Experience Required:</strong> {selectedJob.min_experience} years
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Salary:</strong> {selectedJob.salary}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Employment Type:</strong> {selectedJob.employment_type}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Description:</strong> {selectedJob.job_description}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Company Description:</strong> {selectedJob.company_description}
                                </Typography>
                                <Button variant="contained" onClick={handleClose} sx={{ mt: 3 }}>
                                    Close
                                </Button>
                            </Stack>
                        ) : (
                            <Typography variant="body1">Loading...</Typography>
                        )}
                    </Box>
                </Modal>
            </Box>
        </Container>
    );
};

export default SeekerTrack;
