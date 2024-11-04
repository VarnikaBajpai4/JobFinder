// src/components/Header.jsx
import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b border-gray-200">
      <Link to="/home" className="text-2xl font-bold text-gray-800">JobFinder</Link>
      <nav className="flex gap-6">
        <NavLink to="/home" activeClassName="text-gray-900 font-semibold" className="text-gray-600 hover:text-gray-900">Home</NavLink>
        <NavLink to="/track-applications" activeClassName="text-gray-900 font-semibold" className="text-gray-600 hover:text-gray-900">Track Applications</NavLink>
      </nav>
      <ProfileDropdown />
    </header>
  );
  
};

export default Header;
