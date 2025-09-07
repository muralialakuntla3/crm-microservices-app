import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import { User } from './models/User.js';


dotenv.config();


const app = express();


// Middlewares
app.use(helmet());
app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());
app.use(morgan('dev'));


// Health check
app.get('/health', (_req, res) => {
res.json({ status: 'ok', service: 'user-service', uptime: process.uptime() });
});


// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);


// Error handlers
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;


// Start server after DB connects
connectDB()
.then(() => {
// seed default admin if not exists
const seed = async () => {
try {
const exists = await User.findOne({ email: 'admin@gmail.com' }).lean();
if (!exists) {
await User.create({ name: 'admin', email: 'admin@gmail.com', password: 'admin123', role: 'admin' });
console.log('Seeded default admin: admin@gmail.com / admin123');
}
} catch (e) {
console.error('Admin seed error:', e.message);
}
};
seed();
app.listen(PORT, () => console.log(`user-service listening on :${PORT}`));
})
.catch((err) => {
console.error('DB connection failed:', err);
process.exit(1);
});

export default app; // For testing purposes