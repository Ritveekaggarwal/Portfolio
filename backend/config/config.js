import 'dotenv/config'

const requiredEnvVariables = [
  'PORT',
  'MONGODB_URI',
  'EMAIL_USER',
  'EMAIL_APP_PASSWORD',
  'CONTACT_RECEIVER_EMAIL',
  'ADMIN_EMAIL',
  'ADMIN_SETUP_KEY',
  'JWT_SECRET',
]

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(
      `Missing required environment variable: ${variable}`,
    )
  }
}

const port = Number(process.env.PORT)

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(
    'PORT must be a valid number between 1 and 65535',
  )
}

const config = {
  env: process.env.NODE_ENV || 'development',

  port,

  mongodbUri: process.env.MONGODB_URI,

  email: {
    user: process.env.EMAIL_USER,
    appPassword: process.env.EMAIL_APP_PASSWORD,
    receiver: process.env.CONTACT_RECEIVER_EMAIL,
  },

  admin: {
    email: process.env.ADMIN_EMAIL,
    setupKey: process.env.ADMIN_SETUP_KEY,
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET,

    rpName: process.env.RP_NAME || 'Developer Portfolio',

    rpID:
      process.env.RP_ID ||
      'localhost',

    origin:
      process.env.ORIGIN ||
      'http://localhost:5173',
  },
google: {
  clientId:
    process.env.GOOGLE_CLIENT_ID,

  clientSecret:
    process.env.GOOGLE_CLIENT_SECRET,

  redirectUri:
    process.env.GOOGLE_REDIRECT_URI,

  refreshToken:
    process.env.GOOGLE_REFRESH_TOKEN,

  sender:
    process.env.GOOGLE_GMAIL_USER,
},

email: {
  receiver:
    process.env.CONTACT_RECEIVER_EMAIL,
},
}

export default config