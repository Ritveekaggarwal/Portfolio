import About from '../models/about.model.js'

const getAbout = async () => {
  return await About.findOne().lean()
}

const updateAbout = async (description) => {
  let about = await About.findOne()

  if (!about) {
    about = await About.create({
      description,
    })

    return about
  }

  about.description = description

  return await about.save()
}

export {
  getAbout,
  updateAbout,
}