import { google } from 'googleapis'
import config from '../config/config.js'

const oauth2Client =
  new google.auth.OAuth2(
    config.google.clientId,
    config.google.clientSecret,
  )

oauth2Client.setCredentials({
  refresh_token:
    config.google.refreshToken,
})

const gmail = google.gmail({
  version: 'v1',
  auth: oauth2Client,
})

const encodeMessage = (message) =>
  Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const sendContactEmail = async ({
  name,
  email,
  subject,
  message,
}) => {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New Portfolio Contact</h2>

      <p>
        <strong>Name:</strong>
        ${escapeHtml(name)}
      </p>

      <p>
        <strong>Email:</strong>
        ${escapeHtml(email)}
      </p>

      <p>
        <strong>Subject:</strong>
        ${escapeHtml(subject)}
      </p>

      <hr />

      <p>
        <strong>Message:</strong>
      </p>

      <p>
        ${escapeHtml(message).replace(/\n/g, '<br />')}
      </p>
    </div>
  `

  const rawMessage = [
    `From: ${config.google.sender}`,
    `To: ${config.email.receiver}`,
    `Reply-To: ${email}`,
    `Subject: Portfolio Contact: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    '',
    html,
  ].join('\r\n')

  return gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodeMessage(rawMessage),
    },
  })
}

export default sendContactEmail