import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import portfolioRoutes from '../routes/portfolio.routes.js'
import experienceRoutes from '../routes/experience.routes.js'
import educationRoutes from '../routes/education.routes.js'
import projectRoutes from '../routes/project.routes.js'
import contactRoutes from '../routes/contact.routes.js'
import authRoutes from '../routes/auth.routes.js'
import aboutRoutes from '../routes/about.routes.js'
import googleAuthRoutes from '../routes/google-auth.routes.js'

const app = express()

// ---------------------------------------------
// Middleware
// ---------------------------------------------

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// ---------------------------------------------
// Routes
// ---------------------------------------------

app.use('/api/portfolio', portfolioRoutes)

app.use('/api/experience', experienceRoutes)

app.use('/api/education', educationRoutes)

app.use('/api/projects', projectRoutes)

app.use('/api/contact', contactRoutes)

app.use('/api/auth', authRoutes)

app.use('/api/about', aboutRoutes)
app.use(
  '/api/auth',
  googleAuthRoutes,
)

export default app