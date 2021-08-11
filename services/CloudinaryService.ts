import { NextFunction, Request } from 'express';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import {
    CLOUDINARY_API_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_FOLDER,
} from '../config';
import CustomError from './CustomError';

export const Cloudinary = {
    configure: () => {
        cloudinary.config({
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
            cloud_name: CLOUDINARY_API_CLOUD_NAME,
        });
    },
    upload: async (req: Request, next: NextFunction) => {
        if (!req.file) return next(CustomError.badRequest(`Please select a valid file`));

        let uploadedFile: UploadApiResponse;
        console.log('Folder name => ', CLOUDINARY_API_FOLDER);
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: `${CLOUDINARY_API_FOLDER}`,
                resource_type: 'auto',
            });

            return uploadedFile;
        } catch (error) {
            console.error(error);
            return next(error);
        }
    },
};
