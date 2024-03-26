const loginMagicLinkTemplate = (data) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Login Magic Link</title>
                <style>
                        body {
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                margin: 0;
                                padding: 20px;
                                background-color: #f4f4f4;
                                color: #333;
                        }
        
                        .container {
                                max-width: 600px;
                                margin: 20px auto;
                                padding: 20px;
                                background-color: #fff;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
        
                        .button {
                                display: block;
                                width: max-content;
                                margin: 20px auto;
                                padding: 10px 20px;
                                background-color: #0056b3;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: bold;
                                text-align: center;
                        }
        
                        .code {
                                font-weight: bold;
                                color: #0056b3;
                        }
        
                        .footer {
                                margin-top: 20px;
                                text-align: center;
                                font-size: 0.8em;
                                color: #888;
                        }
                </style>
        </head>
        
        <body>
        <div class="container">
        <h4>Hello, ${data.name}!</h4>
        <p>Thank you for logging in with us using the email: <strong>${data.email}</strong>. We're excited to have you on board. Please connect to your email address to find the magic code and start using our services.</p>
        <p>Your verification code is: <span class="code">${data.verificationCode}</span></p>
        <div class="footer">
            <p>If you did not create an account using this email address, please ignore this email.</p>
        </div>
    </div>
        </body>
        
        </html>
        `;
};

export default loginMagicLinkTemplate;