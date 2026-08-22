import nodemailer from 'nodemailer'
import config from '../config/config.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: config.email.user,
    pass: config.email.appPassword,
  },
})

const sendContactEmail = async ({
  name,
  email,
  subject,
  message,
}) => {
  const mailOptions = {
    from: config.email.user,
    to: config.email.receiver,

    replyTo: email,

    subject: `Portfolio Contact: ${subject}`,

    text: `
New contact message from your portfolio

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Portfolio Contact</h2>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Subject:</strong> ${subject}
        </p>

        <hr />

        <p>
          <strong>Message:</strong>
        </p>

        <p>${message.replace(/\n/g, '<br />')}</p>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export default sendContactEmail