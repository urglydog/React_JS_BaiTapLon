import express from 'express';
import { handleGetAllReviews } from '../controller/ReviewController.js';


const router = express.Router();

// Review routes
router.get('/', handleGetAllReviews);

export default router;