// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    JobFinder
                </Typography>
                <Button color="inherit">Login</Button>
                <Button color="inherit">Sign Up</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
