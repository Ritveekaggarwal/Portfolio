import express from 'express'

import {
  registerOptions,
  registerPasskey,
  loginOptions,
  loginPasskey,
  logout,
  getCurrentAdmin,
} from '../controllers/auth.controller.js'

import requireAdmin from '../middleware/adminAuth.js'

const router = express.Router()

// ---------------------------------------------
// One-time SuperAdmin setup
// ---------------------------------------------

router.get(
  '/setup/options',
  registerOptions,
)

router.post(
  '/setup/verify',
  registerPasskey,
)

// ---------------------------------------------
// Login
// ---------------------------------------------

router.get(
  '/login/options',
  loginOptions,
)

router.post(
  '/login/verify',
  loginPasskey,
)

// ---------------------------------------------
// Current authenticated admin
// ---------------------------------------------

router.get(
  '/me',
  requireAdmin,
  getCurrentAdmin,
)

// ---------------------------------------------
// Logout
// ---------------------------------------------

router.post(
  '/logout',
  logout,
)

export default router