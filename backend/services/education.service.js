import Education from '../models/education.model.js'

const getEducations = async () => {
  return await Education.find()
    .sort({ createdAt: 1 })
    .lean()
}

const createEducation = async (educationData) => {
  return await Education.create(educationData)
}

const updateEducation = async (
  educationId,
  educationData,
) => {
  const education =
    await Education.findByIdAndUpdate(
      educationId,
      educationData,
      {
        new: true,
        runValidators: true,
      },
    )

  if (!education) {
    throw new Error('Education not found')
  }

  return education
}

const deleteEducation = async (educationId) => {
  const education =
    await Education.findByIdAndDelete(educationId)

  if (!education) {
    throw new Error('Education not found')
  }

  return education
}

export {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
}