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
