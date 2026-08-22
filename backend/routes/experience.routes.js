import express from 'express'

import {
  getExperiencesController,
  createExperienceController,
  updateExperienceController,
  deleteExperienceController,
} from '../controllers/experience.controller.js'

import requireAdmin from '../middleware/adminAuth.js'

const router = express.Router()

// Public
router.get('/', getExperiencesController)

// SuperAdmin
router.post(
  '/',
  requireAdmin,
  createExperienceController,
)

router.patch(
  '/:id',
  requireAdmin,
  updateExperienceController,
)

router.delete(
  '/:id',
  requireAdmin,
  deleteExperienceController,
)

export default router