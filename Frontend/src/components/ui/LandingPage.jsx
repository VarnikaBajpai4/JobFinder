import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const LandingPage = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h4">JobFinder</Typography>
        <Box>
          <Button onClick={() => setOpenLogin(true)}>Login</Button>
          <Button onClick={() => setOpenSignup(true)}>Signup</Button>
        </Box>
      </Box>
      <Box mt={8} textAlign="center">
        <Typography variant="h2" fontWeight="bold">
          Find full-time developer jobs.
        </Typography>
        <Typography variant="subtitle1" mt={2}>
          JobFinder is your one-stop-centre for thousands of digital full-time jobs.
        </Typography>
        <Box mt={4}>
          <Button variant="outlined">Search a Job</Button>
        </Box>
      </Box>
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <SignupModal open={openSignup} onClose={() => setOpenSignup(false)} />
    </Container>
  );
};

export default LandingPage;
