// src/controllers/user.controller.js
import prisma from '../config/db.js';
import { updateUserSchema } from '../validations/user.validation.js';

export const getMyProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        address: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

export const getMyRatings = async (req, res) => {
  try {
    const ratings = await prisma.rating.findMany({
      where: { userId: req.user.id },
      include: {
        store: { select: { id: true, name: true, email: true } }
      }
    });

    res.json({ ratings });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your ratings' });
  }
};

export const updateMyProfile = async (req, res) => {
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: parsed.data
    });

    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};