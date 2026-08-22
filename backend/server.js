import app from './src/app.js'
import config from './config/config.js'
import connectDB from './config/database.js'

const startServer = async () => {
  await connectDB()

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}

startServer()