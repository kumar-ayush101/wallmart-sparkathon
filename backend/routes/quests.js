import express from 'express';
import { updateProgress } from '../controllers/questController.js';
const router = express.Router();

router.post('/progress', updateProgress);
export default router;
