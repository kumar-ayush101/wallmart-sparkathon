import express from 'express';
import { getTopUsers } from '../controllers/leaderBoardController'
const router = express.Router();

router.get('/top', getTopUsers);
export default router;
