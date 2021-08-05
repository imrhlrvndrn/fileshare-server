import https from 'https';
import { File } from '../models';
import { CLIENT_URL } from '../config';
import { CustomError, Cloudinary, Nodemailer } from '../services';
import { Request, Response, NextFunction } from 'express';
import { successResponse, transformOriginalName } from '../utils';
import { generateFileShareTemplate } from '../templates/fileShare.template';

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
            return next(error);
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
            return next(error);
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
            return next(error);
        }
    },
    shareViaEmail: async (req: Request, res: Response, next: NextFunction) => {
        const { emailFrom, emailTo, fileId } = req.body;

        try {
            const returnedFile = await File.findById(fileId);
            if (!returnedFile)
                return next(
                    CustomError.notFound(`File doesn't exist. Please reupload and try again`)
                );

            const transporter = Nodemailer.createTransporter();

            const { file_name, size } = returnedFile;

            const fileSize = `${(size / 1000000).toFixed(2)}`;
            const downloadUrl = `${CLIENT_URL}/download/${fileId}`;

            const mailOptions = {
                from: emailFrom,
                to: emailTo,
                subject: `FileShare | ${emailFrom} Shared a file with you`,
                text: `This file was shared using FileShare`,
                html: generateFileShareTemplate({
                    emailFrom,
                    emailTo,
                    downloadUrl,
                    fileName: file_name,
                    fileSize,
                }),
            };

            const messageId = await Nodemailer.sendEmail(transporter, mailOptions);
            if (!messageId)
                return next(
                    CustomError.serverError(`Couldn't send the file via email. Please try again`)
                );

            returnedFile.sender = emailFrom;
            returnedFile.receiver = emailTo;

            await returnedFile.save();

            return successResponse(res, {
                data: {
                    message: 'File shared via email',
                },
            });
        } catch (error) {
            console.error(error);
            return next(error);
        }
    },
};

export default fileController;
