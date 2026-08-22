import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    userId: {
      type: String,
      required: true,
      unique: true,
    },

    credentialId: {
      type: String,
      default: '',
    },

    publicKey: {
      type: Buffer,
      default: null,
    },

    counter: {
      type: Number,
      default: 0,
    },

    transports: {
      type: [String],
      default: [],
    },

    deviceType: {
      type: String,
      default: '',
    },

    backedUp: {
      type: Boolean,
      default: false,
    },

    registrationChallenge: {
      type: String,
      default: '',
    },

    authenticationChallenge: {
      type: String,
      default: '',
    },

    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const Admin = mongoose.model('Admin', adminSchema)

export default Admin