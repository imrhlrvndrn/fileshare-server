import mongoose from 'mongoose';
import { MONGODB_URI } from '.';

export const connectDB = async () => {
    try {
        await mongoose.connect(
            MONGODB_URI as string,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
            },
            () => console.log(`MongoDB connection established`)
        );
    } catch (error) {
        console.error(`MongoDB connection was interrupted`);
    }
};
