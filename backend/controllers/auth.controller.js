import {
  generateSetupOptions,
  verifySetup,
  generateLoginOptions,
  verifyLogin,
} from '../services/auth.service.js'

import config from '../config/config.js'

const registerOptions = async (req, res) => {
  try {
    const setupKey =
      req.headers['x-setup-key']

    if (
      !setupKey ||
      setupKey !== config.admin.setupKey
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid setup key',
      })
    }

    const options =
      await generateSetupOptions()

    return res.status(200).json({
      success: true,
      data: options,
    })
  } catch (error) {
    console.error(
      'Register options error:',
      error,
    )

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const registerPasskey = async (req, res) => {
  try {
    const setupKey =
      req.headers['x-setup-key']

    if (
      !setupKey ||
      setupKey !== config.admin.setupKey
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid setup key',
      })
    }

    const result =
      await verifySetup(req.body)

    res.cookie(
      'admin_token',
      result.token,
      {
        httpOnly: true,
        secure:
          config.env === 'production',
        sameSite: 'lax',
        maxAge:
          7 * 24 * 60 * 60 * 1000,
      },
    )

    return res.status(200).json({
      success: true,
      message:
        'SuperAdmin passkey registered',
    })
  } catch (error) {
    console.error(
      'Register passkey error:',
      error,
    )

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const loginOptions = async (req, res) => {
  try {
    const options =
      await generateLoginOptions()

    return res.status(200).json({
      success: true,
      data: options,
    })
  } catch (error) {
    console.error(
      'Login options error:',
      error,
    )

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const loginPasskey = async (req, res) => {
  try {
    const result =
      await verifyLogin(req.body)

    res.cookie(
      'admin_token',
      result.token,
      {
        httpOnly: true,
        secure:
          config.env === 'production',
        sameSite: 'lax',
        maxAge:
          7 * 24 * 60 * 60 * 1000,
      },
    )

    return res.status(200).json({
      success: true,
      message: 'Login successful',
    })
  } catch (error) {
    console.error(
      'Passkey login error:',
      error,
    )

    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
    })
  }
}

const logout = async (req, res) => {
  res.clearCookie('admin_token')

  return res.status(200).json({
    success: true,
    message: 'Logged out',
  })
}
const getCurrentAdmin = async (req, res) => {
  return res.status(200).json({
    success: true,
    authenticated: true,
    admin: req.admin,
  })
}

export {
  registerOptions,
  registerPasskey,
  loginOptions,
  loginPasskey,
  logout,
  getCurrentAdmin,
}