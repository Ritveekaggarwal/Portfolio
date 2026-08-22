import nodemailer from 'nodemailer'
import config from '../config/config.js'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,

  secure: false,
  requireTLS: true,

  auth: {
    user: config.email.user,
    pass: config.email.appPassword,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
})

transporter
  .verify()
  .then(() => {
    console.log('SMTP connection verified')
  })
  .catch((error) => {
    console.error(
      'SMTP verification failed:',
      error,
    )
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

        <p>
          ${message.replace(/\n/g, '<br />')}
        </p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export default sendContactEmail