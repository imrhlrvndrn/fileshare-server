import mongoose from 'mongoose';
import { MONGODB_URI } from '.';

export const connectDB = () => {
    mongoose.connect(MONGODB_URI as string);

    const db = mongoose.connection;
    db.on('error', (error) => console.log('MongoDB connection error =>', error));
    db.once('open', () => console.log('MongoDB connected'));
};
