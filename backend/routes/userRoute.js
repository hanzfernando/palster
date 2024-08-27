import express from 'express';
import { getUserDetails } from '../controllers/userController';

const router = express.Router();

router.get('/profile', getUserDetails);

export default router;

