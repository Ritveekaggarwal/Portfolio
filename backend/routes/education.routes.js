import express from 'express'

import {
  getEducationsController,
  createEducationController,
  updateEducationController,
  deleteEducationController,
} from '../controllers/education.controller.js'

import requireAdmin from '../middleware/adminAuth.js'

const router = express.Router()

// Public
router.get('/', getEducationsController)

// SuperAdmin
router.post(
  '/',
  requireAdmin,
  createEducationController,
)

router.patch(
  '/:id',
  requireAdmin,
  updateEducationController,
)

router.delete(
  '/:id',
  requireAdmin,
  deleteEducationController,
)

export default router