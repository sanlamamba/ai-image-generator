import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// const host = process.env.SMTP_HOST;
// const port = process.env.SMTP_PORT;
// const user = process.env.SMTP_USER;
// const pass = process.env.SMTP_PASSWORD;
// const from = process.env.SMTP_FROM;


// const secure = port === 465;

// const transporter = nodemailer.createTransport({
//     host: host, 
//     port: port,
//     secure: secure,
//     auth: {
//         user: user,
//         pass: pass
//     }
// });

// export const sendEmail = async ({ to, subject, text, template, data }) => {
//     const mailOptions = {
//         from: from,
//         to, 
//         subject, 
//         text, 
//         html: template(data),
//     };
//     try {
//         await transporter.sendMail(mailOptions);
//         console.log("Email sent successfully");
//     } catch (error) {
//         console.error("Error sending email:", error);
//     }
// };


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text, template, data: templateData }) => {
    try {
       const {data,error} = await resend.emails.send({
              from: process.env.RESEND_FROM,
              to,
              subject,
              text,
              html: template(templateData),
         });
        if (error) {
            console.error("Error sending email:", error);
        }
        console.log("Email sent successfully");

    } catch (error) {
        console.error("Error sending email:", error);
    }
}


