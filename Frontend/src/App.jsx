// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import JobSeekerDetails from './components/JobSeekerDetails';
import EmployerDetails from './components/EmployerDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/job-seeker-details" element={<JobSeekerDetails />} />
        <Route path="/employer-details" element={<EmployerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
