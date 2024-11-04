// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import JobSeekerDetails from './components/JobSeekerDetails';
import EmployerDetails from './components/EmployerDetails';
import JobSeekerHome from './pages/JobSeekerHome';
import EmployerHome from './pages/EmployerHome';


function App() {
  // Replace with logic to check if the user is an employer or job seeker
  const isEmployer = false; // Example: Set this based on logged-in user's role

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/job-seeker-details" element={<JobSeekerDetails />} />
        <Route path="/employer-details" element={<EmployerDetails />} />
        <Route path="/job-seeker-home" element={<JobSeekerHome isEmployer={isEmployer} />} />
        <Route path="/employer-home" element={<EmployerHome isEmployer={isEmployer} />} />

      </Routes>
    </Router>
  );
}

export default App;
