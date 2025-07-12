import express from 'express';
import { getTopUsers } from '../controllers/leaderboardController.js';

const router = express.Router();

router.get('/top', getTopUsers);

export default router;
