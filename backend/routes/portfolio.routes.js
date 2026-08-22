import express from 'express'

import {
  getPortfolioController,
  createPortfolioController,
  updatePortfolioController,
  addSkillsController,
  updateSkillController,
  deleteSkillController,
  addSocialLinkController,
  updateSocialLinkController,
  deleteSocialLinkController,
} from '../controllers/portfolio.controller.js'

import requireAdmin from '../middleware/adminAuth.js'

const router = express.Router()

// ---------------------------------------------
// Public
// ---------------------------------------------

router.get('/', getPortfolioController)

// ---------------------------------------------
// SuperAdmin only
// ---------------------------------------------

router.post(
  '/',
  requireAdmin,
  createPortfolioController,
)

router.patch(
  '/',
  requireAdmin,
  updatePortfolioController,
)

// ---------------------------------------------
// Skills
// ---------------------------------------------

router.post(
  '/skills',
  addSkillsController,
)

router.patch(
  '/skills/:index',
  requireAdmin,
  updateSkillController,
)

router.delete(
  '/skills/:index',
  requireAdmin,
  deleteSkillController,
)

// ---------------------------------------------
// Social links
// ---------------------------------------------

router.post(
  '/social-links',
  requireAdmin,
  addSocialLinkController,
)

router.patch(
  '/social-links/:id',
  requireAdmin,
  updateSocialLinkController,
)

router.delete(
  '/social-links/:id',
  requireAdmin,
  deleteSocialLinkController,
)

export default router