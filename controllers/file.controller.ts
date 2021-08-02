import { Request, Response, NextFunction } from 'express';
import { CLIENT_URL } from '../config';
import { File } from '../models';
import { CustomError } from '../services';
import { Cloudinary } from '../services/cloudinary';
import { successResponse, transformOriginalName } from '../utils';

const fileController = {
    upload: async (req: Request, res: Response, next: NextFunction) => {
        console.log({
            body: req.body,
            file: req.file,
        });

        try {
            if (!req.file) return CustomError.badRequest('Please select a valid file');

            let uploadedFile = await Cloudinary.upload(req, next);

            if (!uploadedFile) return CustomError.badRequest('Please select a valid file');
            const { originalname: original_name } = req.file;
            const { secure_url, format, bytes } = uploadedFile;

            transformOriginalName(original_name);

            const newFile = new File({
                file_name: `${transformOriginalName(original_name)}`,
                url: secure_url,
                format,
                size: bytes,
            });

            console.log('New generated file => ', newFile);

            const savedFile = await newFile.save();

            return successResponse(res, {
                data: {
                    file: {
                        _id: savedFile.id,
                        download_url: `${CLIENT_URL}/download/${savedFile.id}`,
                    },
                },
                toast: {
                    message: 'File uploaded successfully',
                    status: 'success',
                },
            });
        } catch (error) {
            console.error(error);
            return next(CustomError.serverError(error.message));
        }
    },
};

export default fileController;
