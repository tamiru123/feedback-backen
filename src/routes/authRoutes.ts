import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authenticate } from '../middleware/auth';
import { validate, loginValidation } from '../middleware/validation';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/login', validate(loginValidation), authController.login);

// Protected routes
router.get('/me', authenticate, authController.getMe);

export default router;