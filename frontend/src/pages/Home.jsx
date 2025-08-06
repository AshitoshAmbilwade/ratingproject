import React from 'react';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;

  return (
    <div>
      <h1>Welcome Home</h1>
      {decoded && (
        <div>
          <p><strong>ID:</strong> {decoded.id}</p>
          <p><strong>Role:</strong> {decoded.role}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
