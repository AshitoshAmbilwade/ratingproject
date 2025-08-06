// src/controllers/rating.controller.js
import prisma from '../config/db.js';
import { ratingSchema } from '../validations/rating.validation.js';

export const rateStore = async (req, res) => {
  const parsed = ratingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { rating } = parsed.data;
  const userId = req.user.id;
  const storeId = req.params.storeId;

  try {
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
