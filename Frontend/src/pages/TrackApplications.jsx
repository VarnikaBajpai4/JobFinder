import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper, Stack } from '@mui/material';
import axios from 'axios';

const TrackApplications = () => {
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', {
          action: 'trackApplications'
        }, { withCredentials: true });

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

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
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
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default TrackApplications;
