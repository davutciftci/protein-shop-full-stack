import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log('[EMAIL] Error verifying email: ', error);
    } else {
        console.log('[EMAIL] Email is verified');
    }
})

export const sendEmail = async (to: string, subject: string, html: string, text?: string) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
            text
        })
        console.log('[EMAIL] Email sent successfully. Message ID: ', info.messageId);
        return info
    } catch (error) {
        console.log('[EMAIL] Failed to send email: ', error);
        throw error
    }
}