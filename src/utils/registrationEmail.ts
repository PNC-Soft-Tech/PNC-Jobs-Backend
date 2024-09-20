import { transporter } from "../config/nodemailer";

export const registrationConfirmationEmail = async (user: any) => {
    const mailOptions = {
      from: process.env.SMTP_SENDER_EMAIL,
      to: user?.email,
      subject: "Welcome to PNC jobs - Your  Job Preparation Starts Now!",
      html: `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to PNC Jobs</title>
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
        <h1>Welcome to PNC Jobs, ${user?.username}!</h1>
        <p>Thank you for registering with PNC Jobs! You’re now part of a vibrant community of professionals and job seekers. Get started by completing your profile and exploring job opportunities that match your skills.</p>
        
        <p><strong>What's next?</strong></p>
         <ul>
            <li>Start participating in quizzes to test your knowledge and track your progress.</li>
            <li>Join ongoing contests to compete with others and sharpen your skills.</li>
            <li>Stay updated with the latest exam schedules and news.</li>
        </ul>
        
        <p>Get started by clicking the button below to explore the quizzes and contests designed to help you achieve your dreams.</p>
        <a href="https://pncjob.com" class="cta-button">Start Your Preparation</a>

        <p class="footer">Need assistance? Reach out to us at <a href="http://pncjob.com">PNC-jobs</a>. We are here to help!</p>

    
        <p class="footer">If you have any questions or need assistance, feel free to <a href="mailto:support@pncjobs.com">contact us</a>. We’re here to help!</p>

        <p class="footer">Best Regards,<br>The PNC Jobs Team</p>
    </div>
</body>
</html>
    `,
    };

    // console.log("mailOptions: ", mailOptions);

    const _res = await transporter.sendMail(mailOptions);
    console.log("Email sent for Registration: ", _res);
    if (_res && _res.messageId) {
        return {
            message: "Invitation sent successfully",
            success: true,
        };
    }
    return {
        success: false,
    };
};
