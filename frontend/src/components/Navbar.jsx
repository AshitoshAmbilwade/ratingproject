// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Optional: remove user info
    navigate('/login');
  };

  return (
    <nav className="bg-gray-700 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        RatingApp
      </Link>

      <div className="space-x-4">
        {token ? (
          <>
            <Link
              to="/dashboard" // You can make this dynamic later
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/update-password"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Update Password
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
