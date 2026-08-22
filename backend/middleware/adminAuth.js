import jwt from 'jsonwebtoken'

import config from '../config/config.js'

const requireAdmin = (req, res, next) => {
  try {
    const token =
      req.cookies.admin_token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const decoded =
      jwt.verify(
        token,
        config.auth.jwtSecret,
      )

    if (
      decoded.role !== 'superadmin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required',
      })
    }

    req.admin = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session',
    })
  }
}

export default requireAdmin