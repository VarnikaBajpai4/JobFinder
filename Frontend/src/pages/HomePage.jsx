// src/pages/HomePage.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to JobFinder
                </Typography>
                <SearchBar />
                <JobList />
            </Container>
            <Footer />
        </div>
    );
};

export default HomePage;
