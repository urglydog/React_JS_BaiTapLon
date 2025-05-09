import express from 'express';
import { login, register, getCurrentUser, logout ,refreshToken} from '../controller/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Authentication routes
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/me',verifyToken, getCurrentUser);
router.post('/refresh', refreshToken);
export default router;