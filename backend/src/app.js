import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import storeOwnerRoutes from './routes/storeOwner.routes.js';
import userRoutes from './routes/user.routes.js';
export const app = express();
app.use(cors());
app.use(express.json());

//temp
import prisma from './config/db.js';

//TODO: Import routes here
// app.use('/api', yourRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/store-owner', storeOwnerRoutes);

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Rating Project API');
});

app.get('/test-db', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


