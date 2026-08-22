import dns from 'node:dns'

dns.setDefaultResultOrder('ipv4first')

import app from './src/app.js'
import config from './config/config.js'
import connectDB from './config/database.js'

const startServer = async () => {
  await connectDB()

  app.listen(
    config.port,
    '0.0.0.0',
    () => {
      console.log(
        `Server running on port ${config.port}`,
      )
    },
  )
}

startServer()