import e from 'express';
import { signupValidator, loginValidator } from '../validators/auth.validator.js';
import validate from '../middlewares/validate.middleware.js';
import { register, login } from '../controllers/auth.controller.js';

const router = e.Router();

router.post('/register', signupValidator, validate, register);
router.post('/login', loginValidator, validate, login);

export default router;
