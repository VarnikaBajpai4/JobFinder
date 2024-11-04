import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Paper, Stack, Container, Modal, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthRedirect from '../hooks/useAuthRedirectLogin';


const SeekerTrack = () => {

    useAuthRedirect({ requiredRole: 'job_seeker', redirectCondition: false });
    const [applications, setApplications] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const formData = new FormData();
                formData.append('action', 'getSeekerApplications'); 

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
            <Box className="mt-16">
                <AppBar position="fixed" color="transparent" elevation={0} className="border-b border-gray-200 bg-white">
                    <Toolbar className="justify-between min-h-[56px]">
                        <Typography variant="h5" fontWeight="bold" className="text-gray-800">JobFinder</Typography>
                        <Box>
                            <Button className="text-gray-600 hover:text-gray-900" component={Link} to="/job-seeker-home">Home</Button>
                            <Button className="text-gray-600 hover:text-gray-900" component={Link} to="/job-seeker-track">Track Applications</Button>
                            <Button className="text-gray-600 hover:text-gray-900" onClick={handleLogout}>Logout</Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Typography variant="h4" align="center" className="text-gray-800 mt-20 mb-8">
                    Track Applications
                </Typography>

                {applications.length === 0 ? (
                    <Typography variant="body1" className="text-gray-600 text-center">
                        No applications found for your job submissions.
                    </Typography>
                ) : (
                    <Stack spacing={4} className="mt-4">
                        {applications.map((application) => (
                            <Paper key={application.application_id} className="p-4">
                                <Typography variant="h6" className="text-gray-800">{application.job_title}</Typography>
                                <Typography variant="body2" className="text-gray-600">Company: {application.company_name}</Typography>
                                <Typography variant="body2" className="text-gray-600">Status: {application.application_status}</Typography>
                                <Typography variant="body2" className="text-gray-600">Applied At: {new Date(application.applied_at).toLocaleString()}</Typography>
                                <Button variant="outlined" onClick={() => handleViewDetails(application.job_id)} className="mt-4 border-gray-500 text-gray-800 hover:bg-gray-100">
                                    View Details
                                </Button>
                            </Paper>
                        ))}
                    </Stack>
                )}

                <Modal open={open} onClose={handleClose}>
                    <Box className="p-8 bg-white rounded-lg max-w-lg mx-auto mt-24 shadow-lg">
                        {selectedJob ? (
                            <Stack spacing={2}>
                                <Typography variant="h6" align="center" className="text-gray-800">
                                    Job Details
                                </Typography>
                                <Divider />
                                <Typography variant="body1"><strong>Title:</strong> {selectedJob.job_title}</Typography>
                                <Typography variant="body1"><strong>Company:</strong> {selectedJob.company_name}</Typography>
                                <Typography variant="body1"><strong>Location:</strong> {selectedJob.location}</Typography>
                                <Typography variant="body1"><strong>Experience Required:</strong> {selectedJob.min_experience} years</Typography>
                                <Typography variant="body1"><strong>Salary:</strong> {selectedJob.salary}</Typography>
                                <Typography variant="body1"><strong>Employment Type:</strong> {selectedJob.employment_type}</Typography>
                                <Typography variant="body1"><strong>Description:</strong> {selectedJob.job_description}</Typography>
                                <Typography variant="body1"><strong>Company Description:</strong> {selectedJob.company_description}</Typography>
                                <Button variant="contained" onClick={handleClose} className="bg-gray-800 text-white hover:bg-gray-900 mt-4">
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
