import nodemailer from 'nodemailer';

class EmailService {
    constructor({ host, port, user, pass, from }) {
        const secure = port === 465;

        this.transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: user,
                pass: pass
            }
        });

        this.from = from;
    }

    async sendEmail({ to, subject, text, template, data }) {
        const mailOptions = {
            from: this.from,  
            to: to,          
            subject: subject,
            text: text,       
            html: template(data), 
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
}

const emailService = new EmailService({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM,
});

export default emailService;

