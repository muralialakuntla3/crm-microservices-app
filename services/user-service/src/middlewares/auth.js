import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';


export const authenticate = async (req, res, next) => {
try {
const authHeader = req.headers.authorization || '';
const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
if (!token) return res.status(401).json({ success: false, message: 'No token provided' });


const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(payload.sub).select('+password');
if (!user || !user.isActive) return res.status(401).json({ success: false, message: 'Invalid user' });


req.user = { id: user.id, role: user.role, email: user.email, name: user.name };
next();
} catch (err) {
return res.status(401).json({ success: false, message: 'Unauthorized' });
}
};


export const authorize = (...allowed) => (req, res, next) => {
if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
if (!allowed.includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
next();
};