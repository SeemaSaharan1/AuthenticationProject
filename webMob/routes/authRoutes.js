import express from 'express';
import { register, login } from '../controllers/authController.js';
import { profile } from '../controllers/profileController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.get('/profile', auth, profile);

export default router;
