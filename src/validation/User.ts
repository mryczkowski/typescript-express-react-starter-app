import { body } from 'express-validator/check';

export const registerUser = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
];

export const authLocal = [
    body('username', 'Invalid email').isEmail(),
    body('password', 'Password required').not().isEmpty(),
];