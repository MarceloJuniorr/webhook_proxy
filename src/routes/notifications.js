import express from 'express';
import { handleNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/:route', handleNotification);

export default router;
