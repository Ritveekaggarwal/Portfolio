import express from 'express'

import {
  getAboutController,
  updateAboutController,
} from '../controllers/about.controller.js'

import requireAdmin from '../middleware/adminAuth.js'

const router = express.Router()

// Public
router.get('/', getAboutController)

// SuperAdmin only
router.patch(
  '/',
  requireAdmin,
  updateAboutController,
)

export default router