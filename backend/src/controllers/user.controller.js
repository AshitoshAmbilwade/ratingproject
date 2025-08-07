// src/controllers/user.controller.js
import prisma from '../config/db.js';

// Get all stores, optionally filtered by name/address
export const getAllStores = async (req, res) => {
  const { name, address } = req.query;

  try {
    const filters = {};

    if (name) {
      filters.name = { contains: name, mode: 'insensitive' };
    }

    if (address) {
      filters.address = { contains: address, mode: 'insensitive' };
    }

    const stores = await prisma.store.findMany({
      where: filters,
      include: {
        ratings: true
      }
    });

    // Calculate average rating per store
    const storesWithRating = stores.map(store => {
      const total = store.ratings.reduce((acc, r) => acc + r.rating, 0);
      const avg = store.ratings.length ? (total / store.ratings.length).toFixed(1) : 'N/A';

      return {
        ...store,
        averageRating: avg
      };
    });

    res.json({ stores: storesWithRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch stores' });
  }
};
