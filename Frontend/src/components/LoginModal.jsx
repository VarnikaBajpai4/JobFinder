import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import useAuthRedirect from '../hooks/useAuthRedirectLogin'; // Import the hook

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for tracking login success

  // Call the hook only when `isLoggedIn` changes to `true`
  useAuthRedirect(isLoggedIn);

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post(
        'http://localhost/JobFinder/Backend/public/api.php',
        formData,
        { withCredentials: true }
      );

      console.log('Response from server:', response.data);

      if (response.data.success) {
        setIsLoggedIn(true); // Set login state to true after a successful login
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
        {loginMessage && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            {loginMessage}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default LoginModal;
