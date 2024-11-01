import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost/JobFinder/Backend/public/api.php',
        {
          action: 'login',
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setLoginMessage('Login successful!');
        console.log('User Role:', response.data.role);
        
        // Redirect based on role
        const userRole = response.data.role;
        if (userRole === 'job_seeker') {
          navigate('/job-seeker-details');
        } else if (userRole === 'employer') {
          navigate('/employer-details');
        }
      } else {
        setLoginMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage('An error occurred while logging in.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 400, mx: 'auto', mt: '20vh' }}>
        <Typography variant="h6">Login</Typography>
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
        <Button variant="contained" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
        {loginMessage && <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>{loginMessage}</Typography>}
      </Box>
    </Modal>
  );
};

export default LoginModal;
