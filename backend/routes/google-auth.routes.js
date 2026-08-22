import express from 'express'
import { google } from 'googleapis'
import config from '../config/config.js'

const router = express.Router()

const oauth2Client =
  new google.auth.OAuth2(
    config.google.clientId,
    config.google.clientSecret,
    config.google.redirectUri,
  )

router.get('/google', (req, res) => {
  const authorizationUrl =
    oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: true,

      scope: [
        'https://www.googleapis.com/auth/gmail.send',
      ],
    })

  res.redirect(authorizationUrl)
})

router.get(
  '/google/callback',
  async (req, res) => {
    try {
      const { code } = req.query

      if (!code) {
        return res
          .status(400)
          .send('Missing authorization code')
      }

      const { tokens } =
        await oauth2Client.getToken(code)

      console.log(
        'GOOGLE_REFRESH_TOKEN:',
        tokens.refresh_token,
      )

      res.send(`
        <h2>Google authorization successful</h2>
        <p>
          Check your backend terminal for the refresh token.
        </p>
      `)
    } catch (error) {
      console.error(
        'Google OAuth error:',
        error,
      )

      res
        .status(500)
        .send(
          'Google authorization failed',
        )
    }
  },
)

export default router