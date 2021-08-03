import nodemailer, { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
    SENDINBLUE_SMTP_LOGIN,
    SENDINBLUE_SMTP_PASSWORD,
    SENDINBLUE_SMTP_PORT,
    SENDINBLUE_SMTP_SERVER,
} from '../config';

export default {
    createTransporter: () => {
        return nodemailer.createTransport({
            // @ts-ignore
            host: SENDINBLUE_SMTP_SERVER,
            port: SENDINBLUE_SMTP_PORT,
            secure: false,
            auth: {
                user: SENDINBLUE_SMTP_LOGIN,
                pass: SENDINBLUE_SMTP_PASSWORD,
            },
        });
    },
    sendEmail: async (
        transporter: Transporter<SMTPTransport.SentMessageInfo>,
        mailOptions: MailOptions
    ) => {
        return await transporter.sendMail(mailOptions);
    },
};

// Transporter<SMTPTransport.SentMessageInfo>
