// src/routes/rating.routes.js
import express from 'express';
import { rateStore } from '../controllers/rating.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/rate/:storeId', verifyToken, checkRole(['USER']), rateStore);

export default router;
