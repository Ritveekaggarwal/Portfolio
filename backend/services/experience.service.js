import Experience from '../models/experience.model.js'

const getExperiences = async () => {
  return await Experience.find()
    .sort({ createdAt: 1 })
    .lean()
}

const createExperience = async (experienceData) => {
  return await Experience.create(experienceData)
}

const updateExperience = async (
  experienceId,
  experienceData,
) => {
  const experience =
    await Experience.findByIdAndUpdate(
      experienceId,
      experienceData,
      {
        new: true,
        runValidators: true,
      },
    )

  if (!experience) {
    throw new Error('Experience not found')
  }

  return experience
}

const deleteExperience = async (experienceId) => {
  const experience =
    await Experience.findByIdAndDelete(experienceId)

  if (!experience) {
    throw new Error('Experience not found')
  }

  return experience
}

export {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
}