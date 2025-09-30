import { sendEmailProps } from "@src/domain/models/nodemailer-model";
import nodemailer from "nodemailer";
import { env } from './env';

const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: false,
    auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
    },
});

async function sendEmail({ to, subject, text, attachments, cc }: sendEmailProps) {
    await transporter.sendMail({
        from: env.MAIL_FROM,
        to,
        cc,
        subject,
        html: text,
        attachments
    });

    console.log("Email enviado!!!");
}

export { sendEmail };

