// src/services/admin.service.js
import prisma from '../config/db.js';

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
};

export const getAllStoresWithRatings = async () => {
  return await prisma.store.findMany({
    include: {
      ratings: {
        select: { rating: true }
      }
    }
  });
};

export const getAllRatings = async () => {
  return await prisma.rating.findMany({
    include: {
      user: { select: { name: true, email: true } },
      store: { select: { name: true } }
    }
  });
};


export const createStoreByAdmin = async ({ name, email, address }) => {
  // Check if user with this email exists and is a STORE_OWNER
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.role !== 'STORE_OWNER') {
    throw new Error('Store Owner not found or invalid role');
  }

  // Check if store already exists with same email (optional check)
  const existingStore = await prisma.store.findFirst({
    where: { email }
  });
  

  // Create store
  const newStore = await prisma.store.create({
    data: {
      name,
      email,
      address,
      ownerId: user.id
    }
  });

  return newStore;
};
