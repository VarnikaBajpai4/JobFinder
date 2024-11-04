import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Paper, Stack, Container, Modal, Card, CardContent, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TrackApplications = () => {
  const [applications, setApplications] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSeeker, setSelectedSeeker] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const formData = new FormData();
        formData.append('action', 'trackApplications');

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

  const handleOpen = async (seekerId) => {
    try {
      const formData = new FormData();
      formData.append('action', 'getJobSeekerDetails');
      formData.append('seeker_id', seekerId);

      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        setSelectedSeeker(response.data.data);
        setOpen(true);
      } else {
        console.error('Failed to fetch seeker details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching seeker details:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSeeker(null);
  };
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      const formData = new FormData();
      formData.append('action', 'updateApplicationStatus');
      formData.append('application_id', applicationId);
      formData.append('status', status);

      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        alert(`Application ${status} successfully.`);
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.application_id === applicationId ? { ...app, application_status: status } : app
          )
        );
      } else {
        console.error('Failed to update application status:', response.data.message);
        alert('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Error updating application status. Please try again.');
    }
  };

  const handleAccept = (applicationId) => {
    handleStatusUpdate(applicationId, 'accepted');
  };

  const handleReject = (applicationId) => {
    handleStatusUpdate(applicationId, 'rejected');
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
              <Button color="inherit" component={Link} to="/employer-home" sx={{ fontSize: '0.9rem', mx: 1 }}>
                Home
              </Button>
              <Button color="inherit" component={Link} to="/track-applications" sx={{ fontSize: '0.9rem', mx: 1 }}>
                Track Applications
              </Button>
              <Button color="inherit" component={Link} to="/employer-profile" sx={{ fontSize: '0.9rem', mx: 1 }}>
                User Profile
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Typography variant="h4" align="center" gutterBottom mt={8}>
          Track Applications
        </Typography>

        {applications.length === 0 ? (
          <Typography variant="body1" color="textSecondary" align="center">
            No applications found for your job postings.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {applications.map((application) => (
              <Paper key={application.application_id} sx={{ p: 2 }}>
                <Typography variant="h6">{application.job_title}</Typography>
                <Typography variant="body2">
                  Applicant ID: {application.seeker_id} - {application.full_name}
                </Typography>
                <Typography variant="body2">
                  Status: {application.application_status}
                </Typography>
                <Typography variant="body2">
                  Applied At: {new Date(application.applied_at).toLocaleString()}
                </Typography>
                <Button variant="outlined" onClick={() => handleOpen(application.seeker_id)} sx={{ mt: 2 }}>
                  Details
                </Button>
              </Paper>
            ))}
          </Stack>
        )}

        {/* Modal for Job Seeker Details */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 600, mx: 'auto', mt: '10vh', boxShadow: 24 }}>
            {selectedSeeker ? (
              <Stack spacing={2}>
                <Typography variant="h6" align="center">
                  Applicant Details
                </Typography>
                <Divider />
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedSeeker.full_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {selectedSeeker.location}
                </Typography>
                <Typography variant="body1">
                  <strong>Skills:</strong> {selectedSeeker.skills.join(', ')}
                </Typography>
                <Typography variant="body1">
                  <strong>Resume:</strong>{' '}
                  <a
                    href={`http://localhost/${selectedSeeker.resume.replace(/^.*JobFinder/, 'JobFinder')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'blue', textDecoration: 'underline' }}
                  >
                    Download PDF
                  </a>


                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                  <Button variant="contained" color="success" onClick={() => handleAccept(selectedSeeker.application_id)}>
                    Accept
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleReject(selectedSeeker.application_id)}>
                    Reject
                  </Button>
                  <Button variant="contained" onClick={handleClose}>
                    Close
                  </Button>
                </Stack>

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

export default TrackApplications;
