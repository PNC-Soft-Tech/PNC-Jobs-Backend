import { transporter } from "../config/nodemailer";

export const invitationEmail = async (sender: any, receiver: any) => {
  const mailOptions = {
    from: process.env.SMTP_SENDER_EMAIL,
    to: receiver?.email,
    subject: "You've received a friend request on Amulette!",
    text: `
    Hey ${receiver?.userName},

    I hope you're doing well! 😊 You've received a friend request from ${sender?.userName} on Amulette. ${sender?.userName} would love to connect with you and become friends on the platform.

    Amulette is a fantastic place to stay connected, share updates, and discover new things together. It's easy to use and a lot of fun!

    To accept the friend request and connect with ${sender?.userName}, simply click on the link below and sign up for free:

  

    We can't wait to see you on Amulette!

    Best regards,
    ${sender?.userName}
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
