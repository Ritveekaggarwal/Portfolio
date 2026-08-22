import Project from '../models/project.model.js'

const getProjects = async () => {
  return await Project.find()
    .sort({ createdAt: 1 })
    .lean()
}

const createProject = async (projectData) => {
  return await Project.create(projectData)
}

const updateProject = async (
  projectId,
  projectData,
) => {
  const project = await Project.findByIdAndUpdate(
    projectId,
    projectData,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!project) {
    throw new Error('Project not found')
  }

  return project
}

const deleteProject = async (projectId) => {
  const project = await Project.findByIdAndDelete(
    projectId,
  )

  if (!project) {
    throw new Error('Project not found')
  }

  return project
}

export {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
}