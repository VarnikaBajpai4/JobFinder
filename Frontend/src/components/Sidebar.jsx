// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isEmployer }) => (
  <aside className="sidebar">
    <NavLink to="/home" activeClassName="active">Home</NavLink>
    <NavLink to="/track-applications" activeClassName="active">Track Applications</NavLink>
    {isEmployer && <NavLink to="/add-job-listing" activeClassName="active">Add Job Listing</NavLink>}
  </aside>
);

export default Sidebar;
