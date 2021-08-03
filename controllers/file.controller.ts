import { Request, Response, NextFunction } from 'express';
import { CLIENT_URL } from '../config';
import { File } from '../models';
import { CustomError } from '../services';
import { Cloudinary } from '../services/cloudinary';
import { successResponse, transformOriginalName } from '../utils';
import https from 'https';

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

            const newFile = new File({
                file_name: `${transformOriginalName(original_name)}`,
                url: secure_url,
                format,
                size: bytes,
            });

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
    getFileById: async (req: Request, res: Response, next: NextFunction) => {
        const { fileId } = req.params;
        try {
            const returnedFile = await File.findById(fileId);
            if (!returnedFile) return next(CustomError.notFound(`File doesn't exist`));

            return successResponse(res, {
                data: {
                    file: returnedFile,
                },
            });
        } catch (error) {
            console.error(error);
            return next(CustomError.serverError());
        }
    },
    downloadFileById: async (req: Request, res: Response, next: NextFunction) => {
        const { fileId } = req.params;
        try {
            const returnedFile = await File.findById(fileId);
            if (!returnedFile) return next(CustomError.notFound(`File doesn't exist`));

            https.get(returnedFile.url, (fileStream) => fileStream.pipe(res));
        } catch (error) {
            console.error(error);
            return next(CustomError.serverError());
        }
    },
};

export default fileController;
