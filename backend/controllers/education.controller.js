import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../services/education.service.js'

const getEducationsController = async (req, res) => {
  try {
    const educations = await getEducations()

    return res.status(200).json({
      success: true,
      data: educations,
    })
  } catch (error) {
    console.error('Get education error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to get education',
    })
  }
}

const createEducationController = async (
  req,
  res,
) => {
  try {
    const education =
      await createEducation(req.body)

    return res.status(201).json({
      success: true,
      data: education,
    })
  } catch (error) {
    console.error('Create education error:', error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const updateEducationController = async (
  req,
  res,
) => {
  try {
    const education =
      await updateEducation(
        req.params.id,
        req.body,
      )

    return res.status(200).json({
      success: true,
      data: education,
    })
  } catch (error) {
    console.error('Update education error:', error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteEducationController = async (
  req,
  res,
) => {
  try {
    await deleteEducation(req.params.id)

    return res.status(200).json({
      success: true,
      message: 'Education deleted successfully',
    })
  } catch (error) {
    console.error('Delete education error:', error)

    return res.status(404).json({
      success: false,
      message: error.message,
    })
  }
}

export {
  getEducationsController,
  createEducationController,
  updateEducationController,
  deleteEducationController,
}