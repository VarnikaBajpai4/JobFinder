import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SignupModal = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = () => {
    // Simulate signup logic, such as password hashing and API call
    console.log('Signup is successful, you can login now');
    // Additional signup logic would go here, like sending data to the backend

    // Close the modal after successful signup
    onClose();
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
            <MenuItem value="Job Seeker">Job Seeker</MenuItem>
            <MenuItem value="Employer">Employer</MenuItem>
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
