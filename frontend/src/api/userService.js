// src/api/userService.js
import API from './axiosInstance';

// Fetch all stores (optionally support search by name/address)
export const getAllStores = async (searchParams = {}) => {
  const response = await API.get('/user/stores', {
    params: searchParams,
  });
  return response.data;
};

// Submit a new rating
export const submitRating = async (storeId, rating) => {
  const response = await API.post(`/user/rate/${storeId}`, { rating });
  return response.data;
};

// Update existing rating
export const updateRating = async (storeId, rating) => {
  const response = await API.put(`/user/rate/${storeId}`, { rating });
  return response.data;
};

// Fetch user's rating for a specific store
export const getUserRating = async (storeId) => {
  const response = await API.get(`/user/my-rating/${storeId}`);
  return response.data;
};
