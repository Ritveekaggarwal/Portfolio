import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../services/experience.service.js'

const getExperiencesController = async (req, res) => {
  try {
    const experiences = await getExperiences()

    return res.status(200).json({
      success: true,
      data: experiences,
    })
  } catch (error) {
    console.error('Get experiences error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to get experiences',
    })
  }
}

const createExperienceController = async (
  req,
  res,
) => {
  try {
    const experience =
      await createExperience(req.body)

    return res.status(201).json({
      success: true,
      data: experience,
    })
  } catch (error) {
    console.error('Create experience error:', error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const updateExperienceController = async (
  req,
  res,
) => {
  try {
    const experience =
      await updateExperience(
        req.params.id,
        req.body,
      )

    return res.status(200).json({
      success: true,
      data: experience,
    })
  } catch (error) {
    console.error('Update experience error:', error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteExperienceController = async (
  req,
  res,
) => {
  try {
    await deleteExperience(req.params.id)

    return res.status(200).json({
      success: true,
      message: 'Experience deleted successfully',
    })
  } catch (error) {
    console.error('Delete experience error:', error)

    return res.status(404).json({
      success: false,
      message: error.message,
    })
  }
}

export {
  getExperiencesController,
  createExperienceController,
  updateExperienceController,
  deleteExperienceController,
}