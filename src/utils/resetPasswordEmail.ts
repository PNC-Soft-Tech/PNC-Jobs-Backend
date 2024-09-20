import { transporter } from "../config/nodemailer";

export const resetPasswordEmail = async (user: any, resetToken: string) => {
  const mailOptions = {
    from: process.env.SMTP_SENDER_EMAIL,
    to: user?.email,
    subject: "Reset Your Password - PNC Jobs",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
              body {
                  font-family: 'Helvetica Neue', Arial, sans-serif;
                  background-color: #f5f8fa;
                  color: #333;
                  padding: 20px;
              }
              .container {
                  background-color: #ffffff;
                  border-radius: 10px;
                  padding: 30px;
                  max-width: 600px;
                  margin: 0 auto;
                  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #2c3e50;
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              p {
                  font-size: 16px;
                  line-height: 1.6;
                  color: #555;
              }
              .cta-button {
                  display: inline-block;
                  padding: 15px 25px;
                  background-color: #1abc9c;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
                  font-size: 16px;
              }
              .cta-button:hover {
                  background-color: #16a085;
              }
              .footer {
                  margin-top: 30px;
                  font-size: 14px;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Reset Your Password</h1>
              <p>Dear ${user?.username},</p>
              <p>You recently requested to reset your password for your PNC Jobs account. Click the button below to reset it.</p>
              
              <p><a href="${process.env.CLIENT_URL}/reset-password?token=${resetToken}" class="cta-button">Reset Password</a></p>
              
              <p>If you did not request a password reset, please ignore this email. The reset link is valid for 1 hour only.</p>
              
              <p>For any questions or help, please reach out to our support team at <a href="mailto:support@pncjobs.com">support@pncjobs.com</a>.</p>
              
              <p class="footer">Best Regards,<br>The PNC Jobs Team</p>
          </div>
      </body>
      </html>
    `,
  };

  const _res = await transporter.sendMail(mailOptions);
  console.log("Email sent for Password Reset: ", _res);
  if (_res && _res.messageId) {
    return {
      message: "Password reset email sent successfully",
      success: true,
    };
  }
  return {
    success: false,
  };
};
