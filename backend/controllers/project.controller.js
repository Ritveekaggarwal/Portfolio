import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../services/project.service.js'

const getProjectsController = async (req, res) => {
  try {
    const projects = await getProjects()

    return res.status(200).json({
      success: true,
      data: projects,
    })
  } catch (error) {
    console.error('Get projects error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to get projects',
    })
  }
}

const createProjectController = async (req, res) => {
  try {
    const project = await createProject(req.body)

    return res.status(201).json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Create project error:', error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const updateProjectController = async (req, res) => {
  try {
    const project = await updateProject(
      req.params.id,
      req.body,
    )

    return res.status(200).json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Update project error:', error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteProjectController = async (req, res) => {
  try {
    await deleteProject(req.params.id)

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.error('Delete project error:', error)

    return res.status(404).json({
      success: false,
      message: error.message,
    })
  }
}

export {
  getProjectsController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
}