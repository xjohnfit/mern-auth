import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.ts';
import connectDB from './config/db.ts';

//Routes
import userRoutes from './routes/userRoutes.ts';

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.example',
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

//Use Routes
app.use('/api/users', userRoutes);

//Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});