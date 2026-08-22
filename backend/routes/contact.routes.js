import express from 'express'
import sendContactController from '../controllers/contact.controller.js'

const router = express.Router()

router.post('/', sendContactController)

export default router