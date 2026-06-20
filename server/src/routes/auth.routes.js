import e from 'express';
import { signupValidator, loginValidator } from '../validators/auth.validator.js';
import validate from '../middlewares/validate.middleware.js';
import { register, login, logout, getMe } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = e.Router();

router.post('/register', signupValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', authMiddleware, logout);
router.get('/me',authMiddleware, getMe);

export default router;
