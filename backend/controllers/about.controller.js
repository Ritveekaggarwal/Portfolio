import {
  getAbout,
  updateAbout,
} from '../services/about.service.js'

const getAboutController = async (req, res) => {
  try {
    const about = await getAbout()

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About content not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: about,
    })
  } catch (error) {
    console.error('Get about error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to get about content',
    })
  }
}

const updateAboutController = async (req, res) => {
  try {
    const { description } = req.body

    if (!description) {
      return res.status(400).json({
        success: false,
        message: 'Description is required',
      })
    }

    const about = await updateAbout(description)

    return res.status(200).json({
      success: true,
      data: about,
    })
  } catch (error) {
    console.error('Update about error:', error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export {
  getAboutController,
  updateAboutController,
}