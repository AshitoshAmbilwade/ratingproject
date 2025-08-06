// src/controllers/storeOwner.controller.js
import prisma from '../config/db.js';
import { createStoreSchema } from '../validations/store.validation.js';

export const createStore = async (req, res) => {
  const parsed = createStoreSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { name, email, address } = parsed.data;

  try {
    const storeExists = await prisma.store.findUnique({ where: { email } });
    if (storeExists) {
      return res.status(400).json({ message: 'Store already exists with this email' });
    }

    const newStore = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId: req.user.id,  // comes from token
      },
    });

    res.status(201).json({ message: 'Store created', store: newStore });
  } catch (err) {
    res.status(500).json({ error: 'Store creation failed' });
  }
};

export const getMyStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      where: {
        ownerId: req.user.id,
      },
    });

    res.json({ stores });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
};

export const getStoreRatings = async (req, res) => {
  const { storeId } = req.params;

  try {
    const ratings = await prisma.rating.findMany({
      where: {
        storeId,
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    res.json({ ratings });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};
