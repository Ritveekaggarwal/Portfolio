import api from './api'

const getPortfolioContent = async () => {
  const [
    portfolioResponse,
    aboutResponse,
    experienceResponse,
    educationResponse,
    projectsResponse,
  ] = await Promise.all([
    api.get('/portfolio'),
    api.get('/about'),
    api.get('/experience'),
    api.get('/education'),
    api.get('/projects'),
  ])

  return {
    profile: portfolioResponse.data.data,
    about: aboutResponse.data.data,
    experiences: experienceResponse.data.data,
    educations: educationResponse.data.data,
    projects: projectsResponse.data.data,
  }
}

export default getPortfolioContent