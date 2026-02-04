import express from 'express';
import { generateDashboardController } from '../controllers/generateController.js';

const router = express.Router();


router.post('/generate-dashboard', generateDashboardController);

export default router;
