import { body } from 'express-validator';


export const registerValidator = [
body('name').isString().isLength({ min: 2 }).withMessage('Name min 2 chars'),
body('email').isEmail().withMessage('Valid email required'),
body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
body('role').optional().isIn(['admin', 'user']).withMessage('Invalid role'),
];


export const loginValidator = [
body('email').isEmail().withMessage('Valid email required'),
body('password').notEmpty().withMessage('Password required'),
];