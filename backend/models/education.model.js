import mongoose from 'mongoose'

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    timePeriod: {
      type: String,
      trim: true,
    },

    percentage: {
      type: String,
      default: '',
      trim: true,
    },

    cgpa: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

const Education = mongoose.model(
  'Education',
  educationSchema,
)

export default Education