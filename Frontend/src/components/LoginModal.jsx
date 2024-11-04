import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import useLogin from '../hooks/useLogin'; 

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useLogin(isLoggedIn);

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
        setIsLoggedIn(true);
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
      <Box className="p-8 bg-white rounded-md max-w-md mx-auto mt-20 shadow-md">
        <Typography className="text-xl font-bold text-gray-800 mb-4">Login</Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100"
          InputLabelProps={{ className: "text-gray-700" }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100"
          InputLabelProps={{ className: "text-gray-700" }}
        />
        <Button fullWidth onClick={handleLogin} className="mt-4 bg-gray-800 text-white hover:bg-gray-900">
          Login
        </Button>
        {loginMessage && (
          <Typography className="text-sm text-gray-600 mt-4">
            {loginMessage}
          </Typography>
        )}
      </Box>
    </Modal>
  );

};

export default LoginModal;
