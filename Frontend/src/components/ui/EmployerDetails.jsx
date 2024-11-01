import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, MenuItem, Select, Paper, Stack } from '@mui/material';

const EmployerDetails = () => {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [jobTitle, setJobTitle] = useState(''); // New field for Job Title
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [workArrangement, setWorkArrangement] = useState('');

  const handleCompanyLogoChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to the backend
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Employer Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Updated Company Logo field without FormControl */}
          
            <Button variant="outlined" component="label">
              Upload Company Logo
              <input type="file" hidden onChange={handleCompanyLogoChange} />
            </Button>
            {companyLogo && <Typography variant="caption">{companyLogo.name}</Typography>}

            {/* Job Title Field */}
            <TextField
              label="Job Title"
              fullWidth
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <TextField
              label="Company Name"
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              label="Industry"
              fullWidth
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />

            <TextField
              label="Phone"
              fullWidth
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
              label="Email"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Website"
              fullWidth
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel>Preferred Experience Level</InputLabel>
              <Select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                label="Preferred Experience Level"
              >
                <MenuItem value="entry-level">Entry-level</MenuItem>
                <MenuItem value="mid-level">Mid-level</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Work Arrangement</InputLabel>
              <Select
                value={workArrangement}
                onChange={(e) => setWorkArrangement(e.target.value)}
                label="Work Arrangement"
              >
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="on-site">On-site</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </Select>
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

export default EmployerDetails;
