// src/components/ProfileDropdown.jsx
import React, { useState } from 'react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>User Profile</button>
      {isOpen && (
        <div className="dropdown-menu">
          <button>Edit Profile</button>
          <button>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
