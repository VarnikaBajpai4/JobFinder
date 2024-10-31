import React, { useState } from 'react';
import { Container, Typography, Button, Box, Stack, Grid } from '@mui/material';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import mncLogo from '../../assets/mnc.png';
import fintechLogo from '../../assets/fintech.png';
import retailLogo from '../../assets/retail.png';
import startupLogo from '../../assets/startup.png';
import edtechLogo from '../../assets/edtech.png';



const LandingPage = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  return (
    <Box sx={{ overflowY: 'auto', maxHeight: '100vh' }}>
      {/* Sticky Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1000,
          padding: 2,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" fontWeight="bold">
            JobFinder
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => setOpenLogin(true)} variant="text">
              Login
            </Button>
            <Button onClick={() => setOpenSignup(true)} variant="text">
              Signup
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Find full-time developer jobs.
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            JobFinder is your one-stop centre for thousands of digital full-time jobs.
          </Typography>
        </Box>

        {/* Top Companies Hiring Section */}
        <Box mb={8}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Top companies hiring now
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  MNCs
                </Typography>
                <Typography color="textSecondary">2K+ are actively hiring</Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <img src={mncLogo} alt="MNC logo" width="50" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  Fintech
                </Typography>
                <Typography color="textSecondary">112 are actively hiring</Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <img src={fintechLogo} alt="Fintech logo" width="50" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  FMCG & Retail
                </Typography>
                <Typography color="textSecondary">126 are actively hiring</Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <img src={retailLogo} alt="Retail logo" width="50" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  Startups
                </Typography>
                <Typography color="textSecondary">486 are actively hiring</Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <img src={startupLogo} alt="Startup logo" width="50" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  Edtech
                </Typography>
                <Typography color="textSecondary">151 are actively hiring</Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <img src={edtechLogo} alt="Edtech logo" width="50" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Featured Companies Section */}
        <Box mb={8}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Featured companies actively hiring
          </Typography>
          <Grid container spacing={3}>
            {/* Sample cards */}
            {['Capgemini', 'Accolite Digital', 'Actalent Services', 'FIS', 'Genpact'].map((company) => (
              <Grid item xs={12} sm={6} md={4} key={company}>
                <Box
                  sx={{
                    p: 3,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {company}
                  </Typography>
                  <Typography color="textSecondary">Global leader in tech services</Typography>
                  {/* Placeholder rating */}
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    ⭐ 4.5 | 10k+ reviews
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 2 }}>
                    View Jobs
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Popular Job Roles Section */}
        <Box mb={8}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Discover jobs across popular roles
          </Typography>
          <Grid container spacing={3}>
            {/* Sample cards */}
            {['Full Stack Developer', 'Front End Developer', 'DevOps Engineer', 'Technical Lead'].map((role) => (
              <Grid item xs={12} sm={6} md={3} key={role}>
                <Box
                  sx={{
                    p: 3,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {role}
                  </Typography>
                  <Typography color="textSecondary">10k+ Jobs</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Modals */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <SignupModal open={openSignup} onClose={() => setOpenSignup(false)} />
    </Box>
  );
};

export default LandingPage;
