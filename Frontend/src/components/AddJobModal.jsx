// src/components/AddJobModal.jsx
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import axios from 'axios';

const AddJobModal = ({ onClose, onJobAdded }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [employmentType, setEmploymentType] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('action', 'addJobListing');
    formData.append('job_title', jobTitle);
    formData.append('location', location);
    formData.append('min_experience', minExperience);
    formData.append('salary', salary);
    formData.append('job_description', jobDescription);
    formData.append('employment_type', employmentType);

    try {
      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        onJobAdded(); // Notify parent component to refresh job listings
        onClose(); // Close modal after successful submission
      } else {
        console.error('Failed to add job listing:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding job listing:', error);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          maxWidth: 500,
          maxHeight: '80vh', // Set max height for modal
          overflowY: 'auto',  // Enable scrolling if content overflows
          mx: 'auto',
          mt: '10vh'
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Add Job Listing
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Job Title"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <TextField
            label="Location"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Minimum Experience (years)"
            type="number"
            fullWidth
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
          />
          <TextField
            label="Salary"
            fullWidth
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <TextField
            label="Job Description"
            fullWidth
            multiline
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Employment Type</InputLabel>
            <Select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
            >
              <MenuItem value="onsite">On-site</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Job
          </Button>
        </Stack>
      </Box>
    </Modal>

  );
};

export default AddJobModal;
