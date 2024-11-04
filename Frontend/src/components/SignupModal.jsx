import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const SignupModal = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = async () => {
    const formData = new FormData();
    formData.append('action', 'signup');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);

    console.log('Sending data:', {
      name,
      email,
      password,
      role,
    });  //Debugging output

    try {
      const response = await axios.post('http://localhost/JobFinder/Backend/public/api.php', formData, { withCredentials: true });
      console.log(response.data);
      if (response.data.success) {
        alert(response.data.message);
        onClose();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 400, mx: 'auto', mt: '20vh' }}>
        <Typography variant="h6">Signup</Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="job_seeker">Job Seeker</MenuItem>
            <MenuItem value="employer">Employer</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSignup} fullWidth sx={{ mt: 2 }}>
          Signup
        </Button>
      </Box>
    </Modal>
  );
};

export default SignupModal;
