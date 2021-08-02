import express from 'express';
import { fileController } from '../controllers';
import { uploadFile } from '../middlewares';

const router = express.Router();

const { upload } = fileController;

router.route('/upload').post(uploadFile.single('uploadedFile'), upload);

export default router;
