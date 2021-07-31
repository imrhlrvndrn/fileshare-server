import multer from 'multer';

const storage = multer.diskStorage({});
export const uploadFile = multer({ storage });
