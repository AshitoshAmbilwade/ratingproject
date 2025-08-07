import express from 'express';
import { getAllStores } from '../controllers/user.controller.js';
import { rateStore, updateRating, getUserRating } from '../controllers/rating.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/stores', verifyToken, checkRole(['USER']), getAllStores);

router.post('/rate/:storeId', verifyToken, checkRole(['USER']), rateStore);
router.put('/rate/:storeId', verifyToken, checkRole(['USER']), updateRating);
router.get('/my-rating/:storeId', verifyToken, checkRole(['USER']), getUserRating);

export default router;
