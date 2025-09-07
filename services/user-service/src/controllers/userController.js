import { User } from '../models/User.js';
import { ok, created, fail } from '../utils/response.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const listUsers = asyncHandler(async (_req, res) => {
const users = await User.find().select('-password');
return ok(res, { users });
});


export const getUser = asyncHandler(async (req, res) => {
const user = await User.findById(req.params.id);
if (!user) return fail(res, 404, 'User not found');
return ok(res, { user: user.toSafeJSON() });
});


export const updateUser = asyncHandler(async (req, res) => {
const { name, role, isActive } = req.body;
const user = await User.findByIdAndUpdate(
req.params.id,
{ $set: { name, role, isActive } },
{ new: true, runValidators: true }
);
if (!user) return fail(res, 404, 'User not found');
return ok(res, { user: user.toSafeJSON() });
});


export const deleteUser = asyncHandler(async (req, res) => {
const user = await User.findByIdAndDelete(req.params.id);
if (!user) return fail(res, 404, 'User not found');
return ok(res, { deleted: true });
});