import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`Error connecting to MongoDB: ${message}`);
        process.exit(1);
    }
};

export default connectDB;
