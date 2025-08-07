// src/controllers/storeOwner.controller.js
import prisma from '../config/db.js';
import { createStoreSchema } from '../validations/store.validation.js';

export const createStore = async (req, res) => {
  const parsed = createStoreSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { name, address } = parsed.data;

  try {
    const newStore = await prisma.store.create({
      data: {
        name,
        email: req.user.email,       // ✅ Use email from token
        address,
        ownerId: req.user.id,        // ✅ Owner is also from token
      },
    });

    res.status(201).json({ message: 'Store created', store: newStore });
  } catch (err) {
    console.error("Store creation error:", err); // ✅ Debug logs
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

export const deleteStore = async (req, res) => {
  const { storeId } = req.params;

  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Optional: ensure the logged-in store owner owns this store
    if (store.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this store' });
    }

    await prisma.store.delete({ where: { id: storeId } });

    res.json({ message: 'Store deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete store' });
  }
};
