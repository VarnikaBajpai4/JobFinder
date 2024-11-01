import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Grid, Paper, Stack } from '@mui/material';

const JobSeekerDetails = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [resume, setResume] = useState(null);
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [skills, setSkills] = useState([]);

  const skillOptions = ['JavaScript', 'Python', 'Project Management', 'React', 'Node.js', 'Other'];

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setSkills((prevSkills) =>
      prevSkills.includes(value) ? prevSkills.filter((skill) => skill !== value) : [...prevSkills, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to the backend
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Job Seeker Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl>
              
              <Button variant="outlined" component="label">
                Upload Profile Picture
                <input type="file" hidden onChange={handleProfilePictureChange} />
              </Button>
              {profilePicture && <Typography variant="caption">{profilePicture.name}</Typography>}
            </FormControl>

            <FormControl>
              
              <Button variant="outlined" component="label">
                Upload Resume
                <input type="file" hidden onChange={handleResumeChange} />
              </Button>
              {resume && <Typography variant="caption">{resume.name}</Typography>}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                label="Job Type"
              >
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="freelance">Freelance</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Location"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <TextField
              label="Industry"
              fullWidth
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
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
