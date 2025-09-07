import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { ok, created, fail } from '../utils/response.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const signToken = (user) => {
const payload = { sub: user.id, role: user.role };
return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
};


export const register = asyncHandler(async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return fail(res, 422, 'Validation failed', errors.array());


const { name, email, password, role } = req.body;


const exists = await User.findOne({ email });
if (exists) return fail(res, 409, 'Email already in use');


const user = await User.create({ name, email, password, role });
const token = signToken(user);
return created(res, { user: user.toSafeJSON(), token });
});


export const login = asyncHandler(async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return fail(res, 422, 'Validation failed', errors.array());


const { email, password } = req.body;
const user = await User.findOne({ email }).select('+password');
if (!user) return fail(res, 401, 'Invalid credentials');


const match = await user.comparePassword(password);
if (!match) return fail(res, 401, 'Invalid credentials');


const token = signToken(user);
return ok(res, { user: user.toSafeJSON(), token });
});


export const me = asyncHandler(async (req, res) => {
const user = await User.findById(req.user.id);
return ok(res, { user: user.toSafeJSON() });
});