// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import JobSeekerDetails from './components/JobSeekerDetails';
import EmployerDetails from './components/EmployerDetails';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import TrackApplications from './pages/TrackApplications';
import AddJobListing from './pages/AddJobListing';

function App() {
  // Replace with logic to check if the user is an employer or job seeker
  const isEmployer = false; // Example: Set this based on logged-in user's role

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/job-seeker-details" element={<JobSeekerDetails />} />
        <Route path="/employer-details" element={<EmployerDetails />} />
        <Route path="/home" element={<HomePage isEmployer={isEmployer} />} />
        <Route path="/job-detail/:jobId" element={<JobDetailPage />} />
        <Route path="/track-applications" element={<TrackApplications />} />
        <Route path="/add-job-listing" element={isEmployer ? <AddJobListing /> : <HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
