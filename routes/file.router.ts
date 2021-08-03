import express from 'express';
import { fileController } from '../controllers';
import { uploadFile } from '../middlewares';

const router = express.Router();

const { upload, getFileById, downloadFileById, shareViaEmail } = fileController;

router.route('/upload').post(uploadFile.single('uploadedFile'), upload);

router.route('/:fileId').get(getFileById);

router.route('/:fileId/download').get(downloadFileById);

router.route('/email').post(shareViaEmail);

export default router;
