// src/components/JobListingCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JobListingCard = ({ job }) => (
  <div className="job-listing-card">
    <h3>{job.title}</h3>
    <p>{job.companyName}</p>
    <p>{job.location}</p>
    <p>{job.experience} years experience</p>
    <Link to={`/job-detail/${job.id}`}>View Details</Link>
  </div>
);

export default JobListingCard;
