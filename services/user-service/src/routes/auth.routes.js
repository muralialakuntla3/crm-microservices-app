import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidators.js';
import { authenticate } from '../middlewares/auth.js';


const router = Router();


router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.get('/me', authenticate, me);


export default router;