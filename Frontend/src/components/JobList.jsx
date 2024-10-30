// src/components/JobList.jsx
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const JobList = () => {
    // Example job data
    const jobs = [
        { title: 'Software Engineer', company: 'Tech Corp', location: 'Remote' },
        { title: 'Product Manager', company: 'Business Inc', location: 'New York' },
        // Add more jobs here
    ];

    return (
        <Grid container spacing={2}>
            {jobs.map((job, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{job.title}</Typography>
                            <Typography color="textSecondary">{job.company}</Typography>
                            <Typography>{job.location}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default JobList;
