// src/pages/JobDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`/api/job-detail/${jobId}`)
      .then(response => response.json())
      .then(data => setJob(data));
  }, [jobId]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-detail-page">
      <h2>{job.title}</h2>
      <p>Company: {job.companyName}</p>
      <p>Location: {job.location}</p>
      <p>Experience: {job.experience} years</p>
      <p>Job Description: {job.description}</p>
    </div>
  );
};

export default JobDetailPage;
