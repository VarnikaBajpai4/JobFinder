// src/pages/TrackApplications.jsx
import React from 'react';

const TrackApplications = () => {
  const applications = []; // Replace with fetched applications

  return (
    <div className="track-applications">
      <h2>Track Applications</h2>
      {applications.length === 0 ? (
        <p>No current applications.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>{app.jobTitle} - {app.status}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackApplications;
