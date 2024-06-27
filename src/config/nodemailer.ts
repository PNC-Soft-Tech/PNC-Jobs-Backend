
import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_SENDER_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})