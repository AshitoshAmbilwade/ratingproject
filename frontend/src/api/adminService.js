// src/services/adminService.js
import API from './axiosInstance';

// Get all users (normal + admin)
export const fetchAllUsers = async () => {
  const response = await API.get('/admin/users');
  return response.data;
};

// Get all stores with ratings
export const fetchAllStores = async () => {
  const response = await API.get('/admin/stores');
  return response.data;
};

// Get all submitted ratings
export const fetchAllRatings = async () => {
  const response = await API.get('/admin/ratings');
  return response.data;
};

// Add new user (admin or normal)
export const addNewUser = async (userData) => {
  const response = await API.post('/admin/users', userData);
  return response.data;
};

// Add new store
export const addNewStore = async (storeData) => {
  const response = await API.post('/admin/stores-create', storeData);
  return response.data;
};
