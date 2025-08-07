import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  const decoded = token ? jwtDecode(token) : null;
  const role = decoded?.role;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getDashboardRoute = () => {
    switch (role) {
      case 'USER':
        return '/user/dashboard';
      case 'STORE_OWNER':
        return '/store-owner/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <nav className="bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          RatingApp
        </Link>

        {/* Hamburger for Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {token ? (
            <>
              <Link
                to={getDashboardRoute()}
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
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {token ? (
            <>
              <Link
                to={getDashboardRoute()}
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/update-password"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Update Password
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
