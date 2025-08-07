// src/api/storeOwnerService.js
import API from './axiosInstance';

// Create a new store
export const createStore = async (storeData) => {
  const response = await API.post('/store-owner/create', storeData);
  return response.data;
};

// Get stores owned by the logged-in store owner
export const getMyStores = async () => {
  const response = await API.get('/store-owner/my-stores');
  return response.data;
};

// Get ratings for a specific store (owned by store owner)
export const getStoreRatings = async (storeId) => {
  const response = await API.get(`/store-owner/my-store-ratings/${storeId}`);
  return response.data;
};

export const deleteStore = async (storeId) => {
  const response = await API.delete(`/store-owner/delete/${storeId}`);
  return response.data;
};