import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.ts';
import connectDB from './config/db.ts';

// Routes
import userRoutes from './routes/userRoutes.ts';

// Configs
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.example',
});

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use Routes
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});