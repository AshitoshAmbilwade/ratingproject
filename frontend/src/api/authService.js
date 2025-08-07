// src/api/authService.js
import API from './axiosInstance';

const authService = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
  updatePassword: (data) => API.patch('/auth/update-password', data)
};

export default authService;
