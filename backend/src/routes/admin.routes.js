// src/routes/admin.routes.js
import express from 'express';
import { fetchAllUsers, fetchAllStores, fetchAllRatings,createStoreByAdminController } from '../controllers/admin.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/users', verifyToken, checkRole(['ADMIN']), fetchAllUsers);
router.get('/stores', verifyToken, checkRole(['ADMIN']), fetchAllStores);
router.get('/ratings', verifyToken, checkRole(['ADMIN']), fetchAllRatings);
router.post('/stores-create', verifyToken, checkRole(['ADMIN']), createStoreByAdminController);


export default router;
