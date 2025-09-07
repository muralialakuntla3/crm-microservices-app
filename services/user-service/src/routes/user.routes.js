import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.js';
import { listUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';


const router = Router();


// Admin-only user management endpoints
router.use(authenticate, authorize('admin'));


router.get('/', listUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;