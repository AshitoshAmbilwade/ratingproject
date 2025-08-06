// src/controllers/admin.controller.js
import {
  getAllUsers,
  getAllStoresWithRatings,
  getAllRatings
} from '../services/admin.service.js';

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const fetchAllStores = async (req, res) => {
  try {
    const stores = await getAllStoresWithRatings();
    const formattedStores = stores.map(store => {
      const avgRating =
        store.ratings.reduce((sum, r) => sum + r.rating, 0) / (store.ratings.length || 1);
      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating: avgRating.toFixed(2),
        totalRatings: store.ratings.length
      };
    });

    res.json({ stores: formattedStores });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stores' });
  }
};

export const fetchAllRatings = async (req, res) => {
  try {
    const ratings = await getAllRatings();
    res.json({ ratings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch ratings' });
  }
};

