import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ profileName, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle profile dropdown visibility
  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profileName'); // Clear profile info on logout
    setIsLoggedIn(false); // Update login state
    setShowDropdown(false); // Close dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if user is logged in (based on token in localStorage)
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <header className="navbar bg-white/10 backdrop-blur-md shadow-md p-4 fixed top-0 left-0 right-0 z-20 border-b border-white/20">
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-[#4A90E2]">ColoUI</Link>
      </div>

      <div className="navbar-center hidden lg:flex text-black font-bold">
        <ul className="menu menu-horizontal space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          {isLoggedIn && <li><Link to="/how-it-works">Color Suggestions</Link></li>}
        </ul>
      </div>

      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={handleProfileClick} className="btn btn-ghost text-gray-700 font-semibold">
              {profileName}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-10">
                <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary text-white bg-[#4A90E2]">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
