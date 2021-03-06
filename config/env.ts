import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_FOLDER: process.env.CLOUDINARY_API_FOLDER,
    CLOUDINARY_API_CLOUD_NAME: process.env.CLOUDINARY_API_CLOUD_NAME,
    SENDINBLUE_SMTP_SERVER: process.env.SENDINBLUE_SMTP_SERVER,
    SENDINBLUE_SMTP_PORT: process.env.SENDINBLUE_SMTP_PORT,
    SENDINBLUE_SMTP_PASSWORD: process.env.SENDINBLUE_SMTP_PASSWORD,
    SENDINBLUE_SMTP_LOGIN: process.env.SENDINBLUE_SMTP_LOGIN,
};
