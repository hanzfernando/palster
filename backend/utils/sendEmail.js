import { createMailTransporter } from "./createMailTransporter.js";

const sendEmail = async (user) => {
    const transporter = createMailTransporter();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Email Verification',
        text: `Click this link to verify your email: ${process.env.CLIENT_URL}/api/auth/verify-email?token=${user.verificationToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


export { sendEmail };