import env from './env';

export { connectDB } from './db';
export const {
    PORT,
    CLIENT_URL,
    MONGODB_URI,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_CLOUD_NAME,
} = env;
