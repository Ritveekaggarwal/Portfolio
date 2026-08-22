import jwt from 'jsonwebtoken'

import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server'

import {
  isoUint8Array,
} from '@simplewebauthn/server/helpers'

import Admin from '../models/admin.model.js'
import config from '../config/config.js'

const createAdminToken = (adminId) => {
  return jwt.sign(
    {
      adminId,
      role: 'superadmin',
    },
    config.auth.jwtSecret,
    {
      expiresIn: '7d',
    },
  )
}

const generateSetupOptions = async () => {
  let admin = await Admin.findOne()

  if (admin?.isRegistered) {
    throw new Error('SuperAdmin is already registered')
  }

  if (!admin) {
    admin = await Admin.create({
      email: config.admin.email,
      userId: `admin_${Date.now()}`,
    })
  }

  const options = await generateRegistrationOptions({
    rpName: config.auth.rpName,
    rpID: config.auth.rpID,

    userName: admin.email,

    userID: isoUint8Array.fromUTF8String(
      admin.userId,
    ),

    attestationType: 'none',

    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'required',
    },

    preferredAuthenticatorType: 'localDevice',
  })

  admin.registrationChallenge = options.challenge

  await admin.save()

  return options
}

const verifySetup = async (response) => {
  const admin = await Admin.findOne()

  if (!admin) {
    throw new Error('Admin account not found')
  }

  if (admin.isRegistered) {
    throw new Error('SuperAdmin is already registered')
  }

  if (!admin.registrationChallenge) {
    throw new Error('Registration challenge not found')
  }

  const verification =
    await verifyRegistrationResponse({
      response,

      expectedChallenge:
        admin.registrationChallenge,

      expectedOrigin:
        config.auth.origin,

      expectedRPID:
        config.auth.rpID,

      requireUserVerification: true,
    })

  if (!verification.verified) {
    throw new Error(
      'Passkey registration verification failed',
    )
  }

  const registrationInfo =
    verification.registrationInfo

  const {
    credential,
    credentialDeviceType,
    credentialBackedUp,
  } = registrationInfo

  admin.credentialId = credential.id

  admin.publicKey = Buffer.from(
    credential.publicKey,
  )

  admin.counter = credential.counter

  admin.transports =
    credential.transports || []

  admin.deviceType =
    credentialDeviceType

  admin.backedUp =
    credentialBackedUp

  admin.registrationChallenge = ''

  admin.isRegistered = true

  await admin.save()

  return {
    success: true,
    token: createAdminToken(admin._id.toString()),
  }
}

const generateLoginOptions = async () => {
  const admin = await Admin.findOne({
    isRegistered: true,
  })

  if (!admin) {
    throw new Error(
      'SuperAdmin passkey has not been registered yet',
    )
  }

  const options =
    await generateAuthenticationOptions({
      rpID: config.auth.rpID,

      userVerification: 'required',

      allowCredentials: [],
    })

  admin.authenticationChallenge =
    options.challenge

  await admin.save()

  return options
}

const verifyLogin = async (response) => {
  const admin = await Admin.findOne({
    isRegistered: true,
  })

  if (!admin) {
    throw new Error('SuperAdmin not found')
  }

  if (!admin.authenticationChallenge) {
    throw new Error(
      'Authentication challenge not found',
    )
  }

  if (
    response.id !== admin.credentialId
  ) {
    throw new Error(
      'Unknown passkey',
    )
  }

  const verification =
    await verifyAuthenticationResponse({
      response,

      expectedChallenge:
        admin.authenticationChallenge,

      expectedOrigin:
        config.auth.origin,

      expectedRPID:
        config.auth.rpID,

      requireUserVerification: true,

      credential: {
        id: admin.credentialId,

        publicKey:
          new Uint8Array(
            admin.publicKey,
          ),

        counter: admin.counter,

        transports:
          admin.transports,
      },
    })

  if (!verification.verified) {
    throw new Error(
      'Passkey authentication failed',
    )
  }

  admin.counter =
    verification.authenticationInfo
      .newCounter

  admin.authenticationChallenge = ''

  await admin.save()

  return {
    success: true,
    token: createAdminToken(
      admin._id.toString(),
    ),
  }
}

export {
  generateSetupOptions,
  verifySetup,
  generateLoginOptions,
  verifyLogin,
}