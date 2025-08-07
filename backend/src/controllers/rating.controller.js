import prisma from '../config/db.js';
import { ratingSchema } from '../validations/rating.validation.js';

// Submit a new rating
export const rateStore = async (req, res) => {
  const { rating } = req.body;
  const { storeId } = req.params;
  const userId = req.user.id;

  const parsed = ratingSchema.safeParse({ rating, storeId });
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  try {
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_storeId: { userId, storeId }
      }
    });

    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this store' });
    }

    const newRating = await prisma.rating.create({
      data: { rating, userId, storeId }
    });

    res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update rating
export const updateRating = async (req, res) => {
  const { rating } = req.body;
  const { storeId } = req.params;
  const userId = req.user.id;

  try {
    const updated = await prisma.rating.update({
      where: {
        userId_storeId: { userId, storeId }
      },
      data: { rating }
    });

    res.json({ message: 'Rating updated', rating: updated });
  } catch (err) {
    console.error('Rating update failed:', err);
    res.status(500).json({ message: 'Failed to update rating' });
  }
};

// Get user’s own rating for a specific store
export const getUserRating = async (req, res) => {
  const { storeId } = req.params;
  const userId = req.user.id;

  try {
    const rating = await prisma.rating.findUnique({
      where: {
        userId_storeId: { userId, storeId }
      }
    });

    res.json({ rating });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user rating' });
  }
};
