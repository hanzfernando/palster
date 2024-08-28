import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import postRoutes from './routes/postRoute.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json({ limit: '10mb' })); // Adjust as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
    origin: 'http://localhost:7000', // Ensure this matches your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })