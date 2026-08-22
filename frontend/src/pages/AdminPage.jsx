import { useEffect, useState } from 'react'

import api from '../services/api'

function AdminPage() {
  const [activeSection, setActiveSection] =
    useState('profile')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    title: '',
    location: '',
    skills: [],
    socialLinks: [],
  })

  const [about, setAbout] = useState({
    description: '',
  })

  const [experiences, setExperiences] =
    useState([])

  const [educations, setEducations] =
    useState([])

  const [projects, setProjects] =
    useState([])

  const [skillInput, setSkillInput] =
    useState('')

  const [socialInput, setSocialInput] =
    useState({
      name: '',
      url: '',
    })

  const [experienceInput, setExperienceInput] =
    useState({
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    })

  const [educationInput, setEducationInput] =
    useState({
      institution: '',
      degree: '',
      timePeriod: '',
      percentage: '',
      cgpa: '',
    })

  const [projectInput, setProjectInput] =
    useState({
      name: '',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
    })

  const [
    editingExperienceId,
    setEditingExperienceId,
  ] = useState(null)

  const [
    editingEducationId,
    setEditingEducationId,
  ] = useState(null)

  const [
    editingProjectId,
    setEditingProjectId,
  ] = useState(null)

  // ---------------------------------------------
  // Helpers
  // ---------------------------------------------

  const showMessage = (text) => {
    setMessage(text)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  const getErrorMessage = (error) => {
    return (
      error.response?.data?.message ||
      error.message ||
      'Something went wrong'
    )
  }

  // ---------------------------------------------
  // Load data
  // ---------------------------------------------

  const loadData = async () => {
    try {
      setLoading(true)

      await api.get('/auth/me')

      const [
        profileResponse,
        aboutResponse,
        experienceResponse,
        educationResponse,
        projectResponse,
      ] = await Promise.all([
        api.get('/portfolio'),
        api.get('/about'),
        api.get('/experience'),
        api.get('/education'),
        api.get('/projects'),
      ])

      setProfile(profileResponse.data.data)
      setAbout(aboutResponse.data.data)
      setExperiences(
        experienceResponse.data.data,
      )
      setEducations(
        educationResponse.data.data,
      )
      setProjects(
        projectResponse.data.data,
      )
    } catch (error) {
      console.error(error)

      if (
        error.response?.status === 401
      ) {
        window.location.href =
          '/admin/login'

        return
      }

      showMessage(
        getErrorMessage(error),
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // ---------------------------------------------
  // Profile
  // ---------------------------------------------

  const saveProfile = async () => {
    try {
      setSaving(true)

      await api.patch('/portfolio', {
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
        title: profile.title,
        location: profile.location,
      })

      showMessage('Profile saved')
    } catch (error) {
      showMessage(
        getErrorMessage(error),
      )
    } finally {
      setSaving(false)
    }
  }

  // ---------------------------------------------
  // About
  // ---------------------------------------------

  const saveAbout = async () => {
    try {
      setSaving(true)

      await api.patch('/about', {
        description:
          about.description,
      })

      showMessage('About saved')
    } catch (error) {
      showMessage(
        getErrorMessage(error),
      )
    } finally {
      setSaving(false)
    }
  }

  // ---------------------------------------------
  // Skills
  // ---------------------------------------------

  const addSkill = async () => {
  const value = skillInput.trim()

  if (!value) {
    return
  }

  try {
    await api.post(
      '/portfolio/skills',
      {
        skills: value,
      },
    )

    setSkillInput('')

    await loadData()

    showMessage('Skills added')
  } catch (error) {
    showMessage(
      getErrorMessage(error),
    )
  }
}

  const editSkill = async (
    index,
    currentSkill,
  ) => {
    const value = window.prompt(
      'Edit skill',
      currentSkill,
    )

    if (
      value === null ||
      !value.trim()
    ) {
      return
    }

    try {
      await api.patch(
        `/portfolio/skills/${index}`,
        {
          skill: value.trim(),
        },
      )

      await loadData()

      showMessage('Skill updated')
    } catch (error) {
      showMessage(
        getErrorMessage(error),
      )
    }
  }

  const deleteSkill = async (index) => {
    const confirmed =
      window.confirm(
        'Delete this skill?',
      )

    if (!confirmed) {
      return
    }

    try {
      await api.delete(
        `/portfolio/skills/${index}`,
      )

      await loadData()

      showMessage('Skill deleted')
    } catch (error) {
      showMessage(
        getErrorMessage(error),
      )
    }
  }

  // ---------------------------------------------
  // Social links
  // ---------------------------------------------

  const addSocialLink = async () => {
    if (
      !socialInput.name.trim() ||
      !socialInput.url.trim()
    ) {
      return
    }

    try {
      await api.post(
        '/portfolio/social-links',
        {
          name:
            socialInput.name.trim(),

          url:
            socialInput.url.trim(),
        },
      )

      setSocialInput({
        name: '',
        url: '',
      })

      await loadData()

      showMessage('Link added')
    } catch (error) {
      showMessage(
        getErrorMessage(error),
      )
    }
  }

  const editSocialLink = async (
    social,
  ) => {
    const name = window.prompt(
      'Link name',
      social.name,
    )

    if (
      name === null ||
      !name.trim()
    ) {
      return
    }

    const url = window.prompt(
      'Link URL',
      social.url,
    )

    if (
      url === null ||
      !url.trim()
    ) {
      return
    }

    try {
      await api.patch(
        `/portfolio/social-links/${social._id}`,
        {
          name: name.trim(),
          url: url.trim(),
        },
      )

      await loadData()

      showMessage('Link updated')
    } catch (error) {
      showMessage(
        getErrorMessage(error),
      )
    }
  }

  const deleteSocialLink =
    async (id) => {
      const confirmed =
        window.confirm(
          'Delete this link?',
        )

      if (!confirmed) {
        return
      }

      try {
        await api.delete(
          `/portfolio/social-links/${id}`,
        )

        await loadData()

        showMessage('Link deleted')
      } catch (error) {
        showMessage(
          getErrorMessage(error),
        )
      }
    }

  // ---------------------------------------------
  // Experience
  // ---------------------------------------------

  const saveExperience =
    async () => {
      try {
        if (
          !experienceInput.company ||
          !experienceInput.role ||
          !experienceInput.location ||
          !experienceInput.startDate ||
          !experienceInput.endDate ||
          !experienceInput.description
        ) {
          showMessage(
            'Fill all experience fields',
          )

          return
        }

        if (
          editingExperienceId
        ) {
          await api.patch(
            `/experience/${editingExperienceId}`,
            experienceInput,
          )

          showMessage(
            'Experience updated',
          )
        } else {
          await api.post(
            '/experience',
            experienceInput,
          )

          showMessage(
            'Experience added',
          )
        }

        resetExperience()

        await loadData()
      } catch (error) {
        showMessage(
          getErrorMessage(error),
        )
      }
    }

  const editExperience = (
    experience,
  ) => {
    setExperienceInput({
      company:
        experience.company,

      role:
        experience.role,

      location:
        experience.location,

      startDate:
        experience.startDate,

      endDate:
        experience.endDate,

      description:
        experience.description,
    })

    setEditingExperienceId(
      experience._id,
    )

    setActiveSection(
      'experience',
    )
  }

  const deleteExperience =
    async (id) => {
      const confirmed =
        window.confirm(
          'Delete this experience?',
        )

      if (!confirmed) {
        return
      }

      try {
        await api.delete(
          `/experience/${id}`,
        )

        await loadData()

        showMessage(
          'Experience deleted',
        )
      } catch (error) {
        showMessage(
          getErrorMessage(error),
        )
      }
    }

  const resetExperience = () => {
    setExperienceInput({
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    })

    setEditingExperienceId(null)
  }

  // ---------------------------------------------
  // Education
  // ---------------------------------------------

  const saveEducation =
    async () => {
      try {
        if (
          !educationInput.institution ||
          !educationInput.degree ||
          !educationInput.timePeriod
        ) {
          showMessage(
            'Fill required education fields',
          )

          return
        }

        if (
          editingEducationId
        ) {
          await api.patch(
            `/education/${editingEducationId}`,
            educationInput,
          )

          showMessage(
            'Education updated',
          )
        } else {
          await api.post(
            '/education',
            educationInput,
          )

          showMessage(
            'Education added',
          )
        }

        resetEducation()

        await loadData()
      } catch (error) {
        showMessage(
          getErrorMessage(error),
        )
      }
    }

  const editEducation = (
    education,
  ) => {
    setEducationInput({
      institution:
        education.institution,

      degree:
        education.degree,

      timePeriod:
        education.timePeriod,

      percentage:
        education.percentage ||
        '',

      cgpa:
        education.cgpa ||
        '',
    })

    setEditingEducationId(
      education._id,
    )

    setActiveSection(
      'education',
    )
  }

  const deleteEducation =
    async (id) => {
      const confirmed =
        window.confirm(
          'Delete this education entry?',
        )

      if (!confirmed) {
        return
      }

      try {
        await api.delete(
          `/education/${id}`,
        )

        await loadData()

        showMessage(
          'Education deleted',
        )
      } catch (error) {
        showMessage(
          getErrorMessage(error),
        )
      }
    }

  const resetEducation = () => {
    setEducationInput({
      institution: '',
      degree: '',
      timePeriod: '',
      percentage: '',
      cgpa: '',
    })

    setEditingEducationId(null)
  }

  // ---------------------------------------------
  // Projects
  // ---------------------------------------------

  const saveProject = async () => {
    try {
      if (
        !projectInput.name ||
        !projectInput.description
      ) {
        showMessage(
          'Name and description are required',
        )

        return
      }

      const projectData = {
        name:
          projectInput.name,

        description:
          projectInput.description,

        technologies:
          projectInput.technologies
            .split(',')
            .map((item) =>
              item.trim(),
            )
            .filter(Boolean),

        liveUrl:
          projectInput.liveUrl,

        githubUrl:
          projectInput.githubUrl,
      }

      if (
        editingProjectId
      ) {
        await api.patch(
          `/projects/${editingProjectId}`,
          projectData,
        )

        showMessage(
          'Project updated',
        )
      } else {
        await api.post(
          '/projects',
          projectData,
        )

        showMessage(
          'Project added',
        )
      }

      resetProject()

      await loadData()
    } catch (error) {
      showMessage(
        getErrorMessage(error),
      )
    }
  }

  const editProject = (
    project,
  ) => {
    setProjectInput({
      name:
        project.name,

      description:
        project.description,

      technologies:
        project.technologies.join(
          ', ',
        ),

      liveUrl:
        project.liveUrl ||
        '',

      githubUrl:
        project.githubUrl ||
        '',
    })

    setEditingProjectId(
      project._id,
    )

    setActiveSection(
      'projects',
    )
  }

  const deleteProject =
    async (id) => {
      const confirmed =
        window.confirm(
          'Delete this project?',
        )

      if (!confirmed) {
        return
      }

      try {
        await api.delete(
          `/projects/${id}`,
        )

        await loadData()

        showMessage(
          'Project deleted',
        )
      } catch (error) {
        showMessage(
          getErrorMessage(error),
        )
      }
    }

  const resetProject = () => {
    setProjectInput({
      name: '',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
    })

    setEditingProjectId(null)
  }

  // ---------------------------------------------
  // Logout
  // ---------------------------------------------

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error(
        'Logout error:',
        error,
      )
    } finally {
      window.location.href =
        '/admin/login'
    }
  }

  // ---------------------------------------------
  // Loading
  // ---------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-600">
          Loading admin...
        </p>
      </div>
    )
  }

  // ---------------------------------------------
  // UI
  // ---------------------------------------------

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* Sidebar */}

        <aside className="w-60 shrink-0 border-r border-slate-200 bg-white p-5">

          <h1 className="mb-8 text-xl font-bold">
            Portfolio Admin
          </h1>

          <nav className="space-y-1">

            {[
              ['profile', 'Profile'],
              ['about', 'About'],
              [
                'experience',
                'Experience',
              ],
              [
                'education',
                'Education',
              ],
              [
                'projects',
                'Projects',
              ],
            ].map(
              ([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setActiveSection(
                      key,
                    )
                  }
                  className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                    activeSection ===
                    key
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {label}
                </button>
              ),
            )}

          </nav>

          <button
            type="button"
            onClick={logout}
            className="mt-8 w-full rounded-lg border border-red-200 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>

        </aside>

        {/* Main */}

        <main className="min-w-0 flex-1 p-8">

          <div className="mb-8 flex items-center justify-between gap-6">

            <div>
              <h2 className="text-3xl font-bold">
                {activeSection
                  .charAt(0)
                  .toUpperCase() +
                  activeSection.slice(
                    1,
                  )}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your portfolio content
              </p>
            </div>

            {message && (
              <div className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
                {message}
              </div>
            )}

          </div>

          {/* ---------------------------------- */}
          {/* PROFILE */}
          {/* ---------------------------------- */}

          {activeSection ===
            'profile' && (
            <>
              <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-sm">

                <h3 className="text-lg font-semibold">
                  Profile
                </h3>

                <div className="mt-5 grid gap-5">

                  {[
                    ['name', 'Name'],
                    ['phone', 'Phone'],
                    ['email', 'Email'],
                    ['title', 'Job Title'],
                    ['location', 'Location'],
                  ].map(
                    ([key, label]) => (
                      <div key={key}>

                        <label className="mb-2 block text-sm font-medium">
                          {label}
                        </label>

                        <input
                          value={
                            profile[key] ||
                            ''
                          }
                          onChange={(
                            event,
                          ) =>
                            setProfile({
                              ...profile,
                              [key]:
                                event
                                  .target
                                  .value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                        />

                      </div>
                    ),
                  )}

                </div>

                <button
                  type="button"
                  onClick={
                    saveProfile
                  }
                  disabled={saving}
                  className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white disabled:opacity-50"
                >
                  {saving
                    ? 'Saving...'
                    : 'Save Profile'}
                </button>

              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">

                {/* Skills */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                  <h3 className="text-lg font-semibold">
                    Skills
                  </h3>

                  <div className="mt-5 flex gap-2">

                    <input
                      value={
                        skillInput
                      }
                      onChange={(
                        event,
                      ) =>
                        setSkillInput(
                          event
                            .target
                            .value,
                        )
                      }
                      onKeyDown={(
                        event,
                      ) => {
                        if (
                          event.key ===
                          'Enter'
                        ) {
                          addSkill()
                        }
                      }}
                      placeholder="React, MongoDB, Python..."
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                    />

                    <button
                      type="button"
                      onClick={
                        addSkill
                      }
                      className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
                    >
                      +
                    </button>

                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {profile.skills.map(
                      (
                        skill,
                        index,
                      ) => (
                        <div
                          key={`${skill}-${index}`}
                          className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm"
                        >

                          <span>
                            {skill}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              editSkill(
                                index,
                                skill,
                              )
                            }
                            className="text-xs text-slate-500 hover:text-slate-900"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteSkill(
                                index,
                              )
                            }
                            className="text-xs text-red-500"
                          >
                            ×
                          </button>

                        </div>
                      ),
                    )}

                  </div>

                </div>

                {/* Social links */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                  <h3 className="text-lg font-semibold">
                    Social Links
                  </h3>

                  <div className="mt-5 space-y-3">

                    <input
                      value={
                        socialInput.name
                      }
                      onChange={(
                        event,
                      ) =>
                        setSocialInput(
                          {
                            ...socialInput,
                            name:
                              event
                                .target
                                .value,
                          },
                        )
                      }
                      placeholder="LinkedIn / GitHub / Project"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                    />

                    <input
                      value={
                        socialInput.url
                      }
                      onChange={(
                        event,
                      ) =>
                        setSocialInput(
                          {
                            ...socialInput,
                            url:
                              event
                                .target
                                .value,
                          },
                        )
                      }
                      placeholder="https://..."
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                    />

                    <button
                      type="button"
                      onClick={
                        addSocialLink
                      }
                      className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
                    >
                      + Add Link
                    </button>

                  </div>

                  <div className="mt-6 space-y-3">

                    {profile.socialLinks.map(
                      (social) => (
                        <div
                          key={
                            social._id
                          }
                          className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4"
                        >

                          <div className="min-w-0">

                            <p className="font-medium">
                              {
                                social.name
                              }
                            </p>

                            <p className="truncate text-sm text-slate-400">
                              {
                                social.url
                              }
                            </p>

                          </div>

                          <div className="flex shrink-0 gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                editSocialLink(
                                  social,
                                )
                              }
                              className="rounded-lg border px-3 py-2 text-sm"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteSocialLink(
                                  social._id,
                                )
                              }
                              className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                            >
                              Delete
                            </button>

                          </div>

                        </div>
                      ),
                    )}

                  </div>

                </div>

              </div>
            </>
          )}

          {/* ---------------------------------- */}
          {/* ABOUT */}
          {/* ---------------------------------- */}

          {activeSection ===
            'about' && (
            <div className="max-w-3xl rounded-2xl bg-white p-6 shadow-sm">

              <label className="mb-2 block text-sm font-medium">
                About Description
              </label>

              <textarea
                rows={10}
                value={
                  about.description
                }
                onChange={(event) =>
                  setAbout({
                    description:
                      event.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-slate-400"
              />

              <button
                type="button"
                onClick={saveAbout}
                disabled={saving}
                className="mt-5 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white disabled:opacity-50"
              >
                {saving
                  ? 'Saving...'
                  : 'Save About'}
              </button>

            </div>
          )}

          {/* ---------------------------------- */}
          {/* EXPERIENCE */}
          {/* ---------------------------------- */}

          {activeSection ===
            'experience' && (
            <div className="space-y-8">

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h3 className="mb-5 text-lg font-semibold">
                  {editingExperienceId
                    ? 'Edit Experience'
                    : 'Add Experience'}
                </h3>

                <div className="grid gap-4 md:grid-cols-2">

                  {[
                    [
                      'company',
                      'Company',
                    ],
                    [
                      'role',
                      'Role',
                    ],
                    [
                      'location',
                      'Location',
                    ],
                    [
                      'startDate',
                      'Start Date',
                    ],
                    [
                      'endDate',
                      'End Date',
                    ],
                  ].map(
                    ([key, label]) => (
                      <div key={key}>

                        <label className="mb-2 block text-sm font-medium">
                          {label}
                        </label>

                        <input
                          value={
                            experienceInput[
                              key
                            ]
                          }
                          onChange={(
                            event,
                          ) =>
                            setExperienceInput(
                              {
                                ...experienceInput,
                                [key]:
                                  event
                                    .target
                                    .value,
                              },
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                        />

                      </div>
                    ),
                  )}

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium">
                      Description
                    </label>

                    <textarea
                      rows={5}
                      value={
                        experienceInput.description
                      }
                      onChange={(
                        event,
                      ) =>
                        setExperienceInput(
                          {
                            ...experienceInput,
                            description:
                              event
                                .target
                                .value,
                          },
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-slate-400"
                    />

                  </div>

                </div>

                <div className="mt-5 flex gap-3">

                  <button
                    type="button"
                    onClick={
                      saveExperience
                    }
                    className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
                  >
                    {editingExperienceId
                      ? 'Update'
                      : 'Add Experience'}
                  </button>

                  {editingExperienceId && (
                    <button
                      type="button"
                      onClick={
                        resetExperience
                      }
                      className="rounded-xl border border-slate-200 px-6 py-3"
                    >
                      Cancel
                    </button>
                  )}

                </div>

              </div>

              <div className="space-y-4">

                {experiences.map(
                  (experience) => (
                    <div
                      key={
                        experience._id
                      }
                      className="rounded-2xl bg-white p-5 shadow-sm"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h4 className="font-semibold">
                            {
                              experience.role
                            }
                          </h4>

                          <p className="text-sm text-slate-500">
                            {
                              experience.company
                            }
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {
                              experience.location
                            }{' '}
                            •{' '}
                            {
                              experience.startDate
                            }{' '}
                            -{' '}
                            {
                              experience.endDate
                            }
                          </p>

                        </div>

                        <div className="flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              editExperience(
                                experience,
                              )
                            }
                            className="rounded-lg border px-3 py-2 text-sm"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteExperience(
                                experience._id,
                              )
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>
                  ),
                )}

              </div>

            </div>
          )}

          {/* ---------------------------------- */}
          {/* EDUCATION */}
          {/* ---------------------------------- */}

          {activeSection ===
            'education' && (
            <div className="space-y-8">

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h3 className="mb-5 text-lg font-semibold">
                  {editingEducationId
                    ? 'Edit Education'
                    : 'Add Education'}
                </h3>

                <div className="grid gap-4 md:grid-cols-2">

                  {[
                    [
                      'institution',
                      'Institution',
                    ],
                    [
                      'degree',
                      'Degree',
                    ],
                    [
                      'timePeriod',
                      'Time Period',
                    ],
                    [
                      'percentage',
                      'Percentage',
                    ],
                    [
                      'cgpa',
                      'CGPA',
                    ],
                  ].map(
                    ([key, label]) => (
                      <div key={key}>

                        <label className="mb-2 block text-sm font-medium">
                          {label}
                        </label>

                        <input
                          value={
                            educationInput[
                              key
                            ]
                          }
                          onChange={(
                            event,
                          ) =>
                            setEducationInput(
                              {
                                ...educationInput,
                                [key]:
                                  event
                                    .target
                                    .value,
                              },
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                        />

                      </div>
                    ),
                  )}

                </div>

                <div className="mt-5 flex gap-3">

                  <button
                    type="button"
                    onClick={
                      saveEducation
                    }
                    className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
                  >
                    {editingEducationId
                      ? 'Update'
                      : 'Add Education'}
                  </button>

                  {editingEducationId && (
                    <button
                      type="button"
                      onClick={
                        resetEducation
                      }
                      className="rounded-xl border border-slate-200 px-6 py-3"
                    >
                      Cancel
                    </button>
                  )}

                </div>

              </div>

              <div className="space-y-4">

                {educations.map(
                  (education) => (
                    <div
                      key={
                        education._id
                      }
                      className="flex items-start justify-between rounded-2xl bg-white p-5 shadow-sm"
                    >

                      <div>

                        <h4 className="font-semibold">
                          {
                            education.degree
                          }
                        </h4>

                        <p className="text-sm text-slate-500">
                          {
                            education.institution
                          }
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {
                            education.timePeriod
                          }
                        </p>

                        {education.cgpa && (
                          <p className="mt-1 text-sm">
                            CGPA:{' '}
                            {
                              education.cgpa
                            }
                          </p>
                        )}

                        {education.percentage && (
                          <p className="mt-1 text-sm">
                            Percentage:{' '}
                            {
                              education.percentage
                            }
                          </p>
                        )}

                      </div>

                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            editEducation(
                              education,
                            )
                          }
                          className="rounded-lg border px-3 py-2 text-sm"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteEducation(
                              education._id,
                            )
                          }
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  ),
                )}

              </div>

            </div>
          )}

          {/* ---------------------------------- */}
          {/* PROJECTS */}
          {/* ---------------------------------- */}

          {activeSection ===
            'projects' && (
            <div className="space-y-8">

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h3 className="mb-5 text-lg font-semibold">
                  {editingProjectId
                    ? 'Edit Project'
                    : 'Add Project'}
                </h3>

                <div className="grid gap-4">

                  <input
                    placeholder="Project name"
                    value={
                      projectInput.name
                    }
                    onChange={(event) =>
                      setProjectInput({
                        ...projectInput,
                        name:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                  />

                  <textarea
                    rows={5}
                    placeholder="Description"
                    value={
                      projectInput.description
                    }
                    onChange={(event) =>
                      setProjectInput({
                        ...projectInput,
                        description:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-slate-400"
                  />

                  <input
                    placeholder="Technologies (React, Node.js, MongoDB)"
                    value={
                      projectInput.technologies
                    }
                    onChange={(event) =>
                      setProjectInput({
                        ...projectInput,
                        technologies:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                  />

                  <input
                    placeholder="Live URL (optional)"
                    value={
                      projectInput.liveUrl
                    }
                    onChange={(event) =>
                      setProjectInput({
                        ...projectInput,
                        liveUrl:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                  />

                  <input
                    placeholder="GitHub URL (optional)"
                    value={
                      projectInput.githubUrl
                    }
                    onChange={(event) =>
                      setProjectInput({
                        ...projectInput,
                        githubUrl:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                  />

                </div>

                <div className="mt-5 flex gap-3">

                  <button
                    type="button"
                    onClick={
                      saveProject
                    }
                    className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
                  >
                    {editingProjectId
                      ? 'Update'
                      : 'Add Project'}
                  </button>

                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={
                        resetProject
                      }
                      className="rounded-xl border border-slate-200 px-6 py-3"
                    >
                      Cancel
                    </button>
                  )}

                </div>

              </div>

              <div className="space-y-4">

                {projects.map(
                  (project) => (
                    <div
                      key={
                        project._id
                      }
                      className="rounded-2xl bg-white p-5 shadow-sm"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <h4 className="font-semibold">
                            {project.name}
                          </h4>

                          <p className="mt-2 text-sm text-slate-500">
                            {
                              project.description
                            }
                          </p>

                          <p className="mt-2 text-xs text-slate-400">
                            {
                              project.technologies.join(
                                ' • ',
                              )
                            }
                          </p>

                        </div>

                        <div className="flex shrink-0 gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              editProject(
                                project,
                              )
                            }
                            className="rounded-lg border px-3 py-2 text-sm"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteProject(
                                project._id,
                              )
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>
                  ),
                )}

              </div>

            </div>
          )}

        </main>

      </div>

    </div>
  )
}

export default AdminPage