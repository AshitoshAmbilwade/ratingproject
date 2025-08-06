// src/controllers/rating.controller.js
import prisma from '../config/db.js';
import { ratingSchema } from '../validations/rating.validation.js';

export const rateStore = async (req, res) => {
      console.log('Rate store endpoint hit!');
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
      data: {
        rating,
        userId,
        storeId
      }
    });

    res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
  } catch (err) {
    console.error('Error submitting rating:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
