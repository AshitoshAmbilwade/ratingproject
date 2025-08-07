// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';

const Home = () => {
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  const role = decoded?.role;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center px-6 text-center">
      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-blue-800 mb-4"
      >
        Welcome to RatingApp
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8"
      >
        A powerful platform where users rate and review stores. Built for users, store owners, and admins — with secure auth, real-time ratings, and more!
      </motion.p>

      {/* Conditional Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {token ? (
          <Link
            to={getDashboardRoute()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </>
        )}
      </motion.div>

      {/* Info Section */}
      <div className="mt-20 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          🔍 Features at a Glance
        </motion.h2>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="text-left text-gray-700 text-md space-y-2"
        >
          {[
            '🔐 Secure Signup/Login for all roles',
            '⭐ Rate and update store reviews (1-5 stars)',
            '📋 Store Owners manage stores and view feedback',
            '📊 Admin overview and control panel',
            '📱 Fully responsive UI',
            '⚙️ Built with MERN stack + Tailwind CSS'
          ].map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-3 rounded shadow"
            >
              {feature}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Home;
