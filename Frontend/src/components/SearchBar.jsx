// src/components/SearchBar.jsx
import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = () => {
    return (
        <Box display="flex" justifyContent="center" mb={4}>
            <TextField
                variant="outlined"
                label="Search for jobs"
                size="small"
                sx={{ flexGrow: 1, mr: 2 }}
            />
            <Button variant="contained" color="primary">
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;
