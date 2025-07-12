import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import questRoutes from './routes/quests.js';
import leaderboardRoutes from './routes/leaderboard.js';
import cartRoutes from './routes/cart.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/cart', cartRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Backend running on port 5000')))
  .catch(err => console.error(err));
