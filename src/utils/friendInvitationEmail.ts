import { transporter } from "../config/nodemailer";

export const friendInvitationEmail = async (sender: any, receiver: any) => {
  const mailOptions = {
    from: process.env.SMTP_SENDER_EMAIL,
    to: receiver?.email,
    subject: "You've received an invitation from Amulette!",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Join Amulette</title>
    <style>
        /* CSS Reset */
        body, h1, h2, p {
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            background-color: #f4f4f4;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
            margin-bottom: 20px;
        }

        p {
            color: #666666;
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }

        .btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Join Amulette - Your Premier Platform for Showcasing and Selling Your Photos</h1>
        <p>Dear Sir,</p>
        <p>Are you a passionate photo creator eager to share your vision with the world and turn your passion into profit? We are thrilled to introduce you to Amulette, your premier destination for showcasing your photos and monetizing your talent.</p>
        <h2>Why Amulette?</h2>
        <ol>
            <li><strong>Showcase Your Talent:</strong> Amulette provides you with a captivating platform to showcase your stunning photos to a global audience of enthusiasts, fellow creators, and potential buyers. Let your creativity shine and inspire others!</li>
            <li><strong>Sell Your Photos:</strong> Monetize your passion by selling your photos directly through Amulette. Whether you're a seasoned professional or an emerging artist, our user-friendly interface and powerful tools empower you to earn from your creativity effortlessly.</li>
            <li><strong>Engage with a Vibrant Community:</strong> Join a vibrant community of photographers, artists, and photography enthusiasts on Amulette. Connect, collaborate, and learn from like-minded individuals who share your passion and commitment to excellence.</li>
        </ol>
        <h2>Getting Started with Amulette:</h2>
        <ol>
            <li><strong>Download the App:</strong> Begin your journey by downloading the Amulette app from the App Store or Google Play Store.</li>
            <li><strong>Sign Up:</strong> Create your Amulette account using your email address or social media accounts.</li>
            <li><strong>Upload Your Photos:</strong> Start showcasing your best work by uploading your photos to your Amulette profile. Our intuitive interface makes it easy to organize and present your portfolio.</li>
            <li><strong>Set Up Your Shop:</strong> Interested in selling your photos? Seamlessly set up your shop within Amulette and start earning from your creativity. Our secure payment system ensures a smooth and hassle-free transaction process for both you and your customers.</li>
        </ol>
        <p>Don't miss out on this incredible opportunity to share your talent, connect with fellow creators, and thrive in the dynamic world of photography.</p>
        <p>Have any questions or need assistance? Our dedicated support team is here to help. Simply reach out to us at [support email or contact information].</p>
        <p>Join Amulette today and unlock the full potential of your photography!</p>
        <a href="#" class="btn">Join Amulette</a>
        <p>Best regards,<br>${sender?.userName}<br></p>
    </div>
</body>
</html>
    
    `,
  };

  // console.log("mailOptions: ", mailOptions);

  const _res = await transporter.sendMail(mailOptions);
  console.log("Email sent for invitation: ", _res);
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
