import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_CLOUD_NAME: process.env.CLOUDINARY_API_CLOUD_NAME,
};
