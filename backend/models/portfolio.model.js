import mongoose from 'mongoose'

const socialLinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: true,
  },
)

const portfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

const Portfolio = mongoose.model(
  'Portfolio',
  portfolioSchema,
)

export default Portfolio