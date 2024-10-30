// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box textAlign="center" p={3} bgcolor="grey.200">
            <Typography variant="body2" color="textSecondary">
                © 2024 JobFinder. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
