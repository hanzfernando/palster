import express from 'express';
import { getUserDetails } from '../controllers/userController.js';
import { authToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/profile', authToken, getUserDetails);

export default router;

