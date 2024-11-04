import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, FormControl, Checkbox, FormControlLabel, Grid, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthRedirect from '../hooks/useAuthRedirectLogin'; 
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
        navigate('/job-seeker-home'); 
      } else {
        alert(response.data.message || 'An error occurred while submitting the form.');
      }
    } catch (error) {
      console.error('Error submitting job seeker details:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper elevation={3} className="p-8 max-w-lg w-full rounded-md">
        <Typography className="text-2xl font-bold text-gray-800 mb-6">
          Job Seeker Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <TextField
              label="Full Name"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-100"
              InputLabelProps={{ className: "text-gray-700" }}
            />
            <TextField
              label="Location (e.g., City, State)"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-100"
              InputLabelProps={{ className: "text-gray-700" }}
            />
            <Box>
              <Typography className="text-lg font-bold text-gray-800 mb-2">
                Skills
              </Typography>
              <Grid container spacing={2}>
                {skillOptions.map((skill) => (
                  <Grid item xs={6} sm={4} key={skill}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={skills.includes(skill)}
                          onChange={handleSkillChange}
                          value={skill}
                          className="text-gray-800"
                        />
                      }
                      label={<span className="text-gray-700">{skill}</span>}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <FormControl>
              <Button variant="outlined" component="label" className="border-gray-500 text-gray-800">
                Upload Resume
                <input type="file" hidden onChange={handleResumeChange} />
              </Button>
              {resume && <Typography className="text-sm text-gray-600 mt-2">{resume.name}</Typography>}
            </FormControl>
            <Button type="submit" fullWidth className="bg-gray-800 text-white hover:bg-gray-900">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
  
};

export default JobSeekerDetails;
