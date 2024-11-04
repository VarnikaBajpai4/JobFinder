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
        onJobAdded(); 
        onClose(); 
      } else {
        console.error('Failed to add job listing:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding job listing:', error);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box className="p-8 bg-white rounded-lg max-w-lg mx-auto mt-24 max-h-[80vh] overflow-y-auto shadow-lg">
        <Typography variant="h6" className="text-gray-800 font-bold mb-4">
          Add Job Listing
        </Typography>
        <Stack spacing={4}>
          <TextField
            label="Job Title"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="bg-gray-100"
            InputLabelProps={{ className: "text-gray-700" }}
          />
          <TextField
            label="Location"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-100"
            InputLabelProps={{ className: "text-gray-700" }}
          />
          <TextField
            label="Minimum Experience (years)"
            type="number"
            fullWidth
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
            className="bg-gray-100"
            InputLabelProps={{ className: "text-gray-700" }}
          />
          <TextField
            label="Salary"
            fullWidth
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="bg-gray-100"
            InputLabelProps={{ className: "text-gray-700" }}
          />
          <TextField
            label="Job Description"
            fullWidth
            multiline
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="bg-gray-100"
            InputLabelProps={{ className: "text-gray-700" }}
          />
          <FormControl fullWidth className="bg-gray-100">
            <InputLabel className="text-gray-700">Employment Type</InputLabel>
            <Select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
              <MenuItem value="onsite">On-site</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit} className="bg-gray-800 text-white hover:bg-gray-900">
            Add Job
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
  
};

export default AddJobModal;
