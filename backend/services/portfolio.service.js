import Portfolio from '../models/portfolio.model.js'

const getPortfolio = async () => {
  return await Portfolio.findOne().lean()
}

const createPortfolio = async (data) => {
  const existingPortfolio = await Portfolio.findOne()

  if (existingPortfolio) {
    throw new Error('Portfolio content already exists')
  }

  return await Portfolio.create(data)
}

const updatePortfolio = async (data) => {
  const portfolio = await Portfolio.findOne()

  if (!portfolio) {
    throw new Error('Portfolio content not found')
  }

  Object.assign(portfolio, data)

  return await portfolio.save()
}

const addSkills = async (skillsInput) => {
  const portfolio = await Portfolio.findOne()

  if (!portfolio) {
    throw new Error('Portfolio content not found')
  }

  const skills = Array.isArray(skillsInput)
    ? skillsInput
    : String(skillsInput || '')
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)

  if (skills.length === 0) {
    throw new Error('At least one skill is required')
  }

  // Remove duplicates from the incoming list.
  const uniqueIncomingSkills = [
    ...new Set(skills),
  ]

  // Don't add skills that already exist.
  const existingSkills = new Set(
    portfolio.skills.map((skill) =>
      skill.toLowerCase(),
    ),
  )

  const newSkills =
    uniqueIncomingSkills.filter(
      (skill) =>
        !existingSkills.has(
          skill.toLowerCase(),
        ),
    )

  if (newSkills.length === 0) {
    throw new Error(
      'All skills already exist',
    )
  }

  portfolio.skills.push(...newSkills)

  return await portfolio.save()
}

const updateSkill = async (index, skill) => {
  const portfolio = await Portfolio.findOne()

  if (!portfolio) {
    throw new Error('Portfolio content not found')
  }

  if (!portfolio.skills[index]) {
    throw new Error('Skill not found')
  }

  portfolio.skills[index] = skill

  return await portfolio.save()
}

const deleteSkill = async (index) => {
  const portfolio = await Portfolio.findOne()

  if (!portfolio) {
    throw new Error('Portfolio content not found')
  }

  if (!portfolio.skills[index]) {
    throw new Error('Skill not found')
  }

  portfolio.skills.splice(index, 1)

  return await portfolio.save()
}

const addSocialLink = async (socialLink) => {
  const portfolio = await Portfolio.findOne()

  if (!portfolio) {
    throw new Error('Portfolio content not found')
  }

  portfolio.socialLinks.push(socialLink)

  return await portfolio.save()
}

const updateSocialLink = async (id, socialLink) => {
  const portfolio = await Portfolio.findOne()

  if (!portfolio) {
    throw new Error('Portfolio content not found')
  }

  const link = portfolio.socialLinks.id(id)

  if (!link) {
    throw new Error('Social link not found')
  }

  link.name = socialLink.name
  link.url = socialLink.url

  return await portfolio.save()
}

const deleteSocialLink = async (id) => {
  const portfolio = await Portfolio.findOne()

  if (!portfolio) {
    throw new Error('Portfolio content not found')
  }

  const link = portfolio.socialLinks.id(id)

  if (!link) {
    throw new Error('Social link not found')
  }

  link.deleteOne()

  return await portfolio.save()
}

export {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  addSkills,
  updateSkill,
  deleteSkill,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
}