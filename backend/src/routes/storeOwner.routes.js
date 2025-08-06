// src/routes/storeOwner.routes.js
import express from 'express';
import { createStore, getMyStores, getStoreRatings } from '../controllers/storeOwner.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';  

const router = express.Router();

router.post('/create', verifyToken, checkRole(['STORE_OWNER']), createStore);
router.get('/my-stores', verifyToken, checkRole(['STORE_OWNER']), getMyStores);
router.get('/my-store-ratings/:storeId', verifyToken, checkRole(['STORE_OWNER']), getStoreRatings);

export default router;
