import express from 'express';
import { register, login } from '../controllers/authController.js';
import { profile } from '../controllers/profileController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.get('/profile', auth, profile);

const authenticateToken = (req, res, next) => {
    // Verify token logic here
    // Example: check if req.headers.authorization contains a valid JWT token
    // If token is valid, call next(); otherwise, return 401 Unauthorized
    next();
};

// Protected route definition
router.get('/auth/protected-route', authenticateToken, (req, res) => {
    // Route logic here for protected resource
    res.status(200).json({ message: 'Access to protected route granted!' });
});

export default router;
