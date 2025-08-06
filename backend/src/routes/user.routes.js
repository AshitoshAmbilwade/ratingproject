// src/routes/user.routes.js
import express from 'express';
import { getMyProfile, getMyRatings, updateMyProfile } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

// 🧾 Get user's profile
router.get('/me', verifyToken, checkRole(['USER']), getMyProfile);

// ⭐ Get all ratings by the user
router.get('/my-ratings', verifyToken, checkRole(['USER']), getMyRatings);

// ✏️ Update user profile
router.put('/update', verifyToken, checkRole(['USER']), updateMyProfile);

export default router;
