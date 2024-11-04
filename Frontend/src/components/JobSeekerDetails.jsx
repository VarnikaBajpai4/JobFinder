// src/components/JobSeekerDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, FormControl, Checkbox, FormControlLabel, Grid, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthRedirect from '../hooks/useAuthRedirectLogin'; // Import the hook

const JobSeekerDetails = () => {
  useAuthRedirect({ requiredRole: 'job_seeker', redirectCondition: true });
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState(null);


  const skillOptions = ['JavaScript', 'Python', 'React', 'Node.js', 'Other'];


  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setSkills((prevSkills) =>
      prevSkills.includes(value) ? prevSkills.filter((skill) => skill !== value) : [...prevSkills, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('action', 'job_seeker_details');
    formData.append('full_name', fullName);
    formData.append('location', location);
    formData.append('skills', JSON.stringify(skills));
    formData.append('resume', resume);

    try {
      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.data.success) {
        alert(response.data.message);
        navigate('/job-seeker-home'); // Redirect to job seeker home upon successful submission
      } else {
        alert(response.data.message || 'An error occurred while submitting the form.');
      }
    } catch (error) {
      console.error('Error submitting job seeker details:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Job Seeker Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <TextField
              label="Location (e.g., City, State)"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Box>
              <Typography variant="body1" fontWeight="bold" gutterBottom>
                Skills
              </Typography>
              <Grid container spacing={1}>
                {skillOptions.map((skill) => (
                  <Grid item xs={6} sm={4} key={skill}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={skills.includes(skill)}
                          onChange={handleSkillChange}
                          value={skill}
                        />
                      }
                      label={skill}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <FormControl>
              <Button variant="outlined" component="label">
                Upload Resume
                <input type="file" hidden onChange={handleResumeChange} />
              </Button>
              {resume && <Typography variant="caption">{resume.name}</Typography>}
            </FormControl>

            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default JobSeekerDetails;
