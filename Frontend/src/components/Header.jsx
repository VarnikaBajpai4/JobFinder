// src/components/Header.jsx
import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/home" className="logo">JobFinder</Link>
      <nav>
        <NavLink to="/home" activeClassName="active">Home</NavLink>
        <NavLink to="/track-applications" activeClassName="active">Track Applications</NavLink>
      </nav>
      <ProfileDropdown />
    </header>
  );
};

export default Header;
