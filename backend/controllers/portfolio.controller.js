import {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  addSkills,
  updateSkill,
  deleteSkill,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from '../services/portfolio.service.js'

const getPortfolioController = async (req, res) => {
  try {
    const portfolio = await getPortfolio()

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio content not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio content',
    })
  }
}

const createPortfolioController = async (req, res) => {
  try {
    const portfolio = await createPortfolio(req.body)

    return res.status(201).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const updatePortfolioController = async (req, res) => {
  try {
    const portfolio = await updatePortfolio(req.body)

    return res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const addSkillsController = async (req, res) => {
  try {
    const portfolio = await addSkills(
      req.body.skills,
    )

    return res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}
const updateSkillController = async (req, res) => {
  try {
    const portfolio = await updateSkill(
      Number(req.params.index),
      req.body.skill,
    )

    return res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteSkillController = async (req, res) => {
  try {
    const portfolio = await deleteSkill(
      Number(req.params.index),
    )

    return res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const addSocialLinkController = async (req, res) => {
  try {
    const portfolio = await addSocialLink(req.body)

    return res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const updateSocialLinkController = async (req, res) => {
  try {
    const portfolio = await updateSocialLink(
      req.params.id,
      req.body,
    )

    return res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteSocialLinkController = async (req, res) => {
  try {
    const portfolio = await deleteSocialLink(
      req.params.id,
    )

    return res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export {
  getPortfolioController,
  createPortfolioController,
  updatePortfolioController,
  addSkillsController,
  updateSkillController,
  deleteSkillController,
  addSocialLinkController,
  updateSocialLinkController,
  deleteSocialLinkController,
}