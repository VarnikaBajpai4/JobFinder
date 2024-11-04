// src/pages/AddJobListing.jsx
import React, { useState } from 'react';

const AddJobListing = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send data to backend
  };

  return (
    <form className="add-job-form" onSubmit={handleSubmit}>
      <h2>Add New Job Listing</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="number" placeholder="Experience (in years)" value={experience} onChange={(e) => setExperience(e.target.value)} required />
      <button type="submit">Add Listing</button>
    </form>
  );
};

export default AddJobListing;
