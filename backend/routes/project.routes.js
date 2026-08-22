import express from 'express'

import {
  getProjectsController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
} from '../controllers/project.controller.js'

import requireAdmin from '../middleware/adminAuth.js'

const router = express.Router()

// Public
router.get('/', getProjectsController)

// SuperAdmin
router.post(
  '/',
  requireAdmin,
  createProjectController,
)

router.patch(
  '/:id',
  requireAdmin,
  updateProjectController,
)

router.delete(
  '/:id',
  requireAdmin,
  deleteProjectController,
)

export default router