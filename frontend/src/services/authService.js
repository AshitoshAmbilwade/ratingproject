// src/services/authService.js
import API from './api';

export const loginUser = async (email, password) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data;
};

export const signupUser = async (data) => {
  const res = await API.post('/auth/signup', data);
  return res.data;
};
