import {
  GitBranch,
  ExternalLink,
} from 'lucide-react'

function SectionHeader({ children }) {
  return (
    <div
      className="flex items-center gap-3"
      style={{
        color:
          'var(--portfolio-text)',
      }}
    >
      {/* Poké Ball style section icon */}

      <div
        className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm"
        style={{
          width: 'var(--portfolio-section-icon-size)',
          height:
            'var(--portfolio-section-icon-size)',
          border:
            '1px solid var(--portfolio-line)',
          background:
            'var(--portfolio-card-bg-solid)',
        }}
      >
        {/* Red half */}

        <div
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              'var(--portfolio-red)',
          }}
        />

        {/* White half */}

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white dark:bg-transparent" />

        {/* Middle line */}

        <div
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
          style={{
            background:
              'var(--portfolio-line)',
          }}
        />

        {/* Center */}

        <div
          className="relative z-10 rounded-full"
          style={{
            width:
              'var(--portfolio-section-icon-core-size)',
            height:
              'var(--portfolio-section-icon-core-size)',
            border:
              '1px solid var(--portfolio-line)',
            background:
              'var(--portfolio-card-bg-solid)',
          }}
        />
      </div>

      <h2
        className="tracking-tight"
        style={{
          color:
            'var(--portfolio-text)',
          fontSize:
            'var(--portfolio-section-title-size)',
          fontWeight: 800,
        }}
      >
        {children}
      </h2>

      <div
        className="h-px flex-1"
        style={{
          background:
            'var(--portfolio-line)',
        }}
      />
    </div>
  )
}

function RightSection({
  about,
  experiences,
  educations,
  projects,
}) {
  return (
    <div
      className="min-w-0"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--portfolio-section-gap)',
      }}
    >
      {/* ======================================== */}
      {/* ABOUT */}
      {/* ======================================== */}

      {about?.description && (
        <section className="portfolio-card min-w-0">
          <SectionHeader>
            About
          </SectionHeader>

          <p
            className="mt-6 whitespace-pre-line break-words"
            style={{
              color:
                'var(--portfolio-text-soft)',
              fontSize:
                'var(--portfolio-body-size)',
              lineHeight:
                'var(--portfolio-line-height)',
            }}
          >
            {about.description}
          </p>
        </section>
      )}

      {/* ======================================== */}
      {/* EXPERIENCE */}
      {/* ======================================== */}

      {experiences?.length > 0 && (
        <section className="portfolio-card min-w-0 overflow-hidden">
          <SectionHeader>
            Experience
          </SectionHeader>

          <div
            className="mt-7 min-w-0"
            style={
              experiences.length > 2
                ? {
                  maxHeight:
                    'var(--portfolio-experience-max-height)',
                  overflowY: 'auto',
                  paddingRight:
                    'var(--portfolio-scroll-padding)',
                }
                : undefined
            }
          >
            <div
              className="min-w-0"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap:
                  'var(--portfolio-item-gap)',
              }}
            >
              {experiences.map(
                (experience) => (
                 <article
  key={experience._id}
  className="
    grid
    min-w-0
    grid-cols-1
    border-l-2
    pl-5
    md:[grid-template-columns:var(--portfolio-experience-meta-width)_minmax(0,1fr)]
  "
  style={{
    gap:
      'var(--portfolio-item-gap)',

    borderColor:
      'var(--portfolio-green)',
  }}
>
                    <div className="min-w-0">
                      <p
                        className="break-words font-semibold"
                        style={{
                          color:
                            'var(--portfolio-green)',
                          fontSize:
                            'var(--portfolio-body-size)',
                        }}
                      >
                        {experience.company}
                      </p>

                      <p
                        className="mt-1 break-words leading-5"
                        style={{
                          color:
                            'var(--portfolio-text-muted)',
                          fontSize:
                            'var(--portfolio-small-size)',
                        }}
                      >
                        {experience.startDate}
                        {' - '}
                        {experience.endDate}
                      </p>

                      <p
                        className="mt-1 break-words"
                        style={{
                          color:
                            'var(--portfolio-text-muted)',
                          fontSize:
                            'var(--portfolio-small-size)',
                        }}
                      >
                        {experience.location}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <h3
                        className="break-words"
                        style={{
                          color:
                            'var(--portfolio-text)',
                          fontSize:
                            'var(--portfolio-card-title-size)',
                          fontWeight: 700,
                        }}
                      >
                        {experience.role}
                      </h3>

                      <p
                        className="mt-3 whitespace-pre-line break-words"
                        style={{
                          color:
                            'var(--portfolio-text-soft)',
                          fontSize:
                            'var(--portfolio-body-size)',
                          lineHeight:
                            'var(--portfolio-line-height)',
                        }}
                      >
                        {experience.description}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* ======================================== */}
      {/* EDUCATION */}
      {/* ======================================== */}

      {educations?.length > 0 && (
        <section className="portfolio-card min-w-0 overflow-hidden">
          <SectionHeader>
            Education
          </SectionHeader>

          <div
            className="mt-8"
            style={
              educations.length > 2
                ? {
                  maxHeight:
                    'var(--portfolio-education-max-height)',
                  overflowY: 'auto',
                  paddingRight:
                    'var(--portfolio-scroll-padding)',
                }
                : undefined
            }
          >
            <div className="relative ml-3">
              {/* Timeline */}

              <div
                className="absolute bottom-2 left-[7px] top-2 w-px"
                style={{
                  background:
                    'linear-gradient(to bottom, var(--portfolio-green), var(--portfolio-green-soft), transparent)',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap:
                    'var(--portfolio-item-gap)',
                }}
              >
                {educations.map(
                  (education) => (
                    <article
                      key={education._id}
                      className="relative pl-8"
                    >
                      {/* Timeline node */}

                      <div
                        className="absolute left-0 top-1 rounded-full border-2"
                        style={{
                          width:
                            'var(--portfolio-timeline-node-size)',
                          height:
                            'var(--portfolio-timeline-node-size)',
                          borderColor:
                            'var(--portfolio-card-bg-solid)',
                          background:
                            'var(--portfolio-green)',
                          boxShadow:
                            '0 0 0 2px var(--portfolio-green-soft)',
                        }}
                      />

                      <div className="portfolio-soft-card min-w-0 p-5">
                        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h3
                              className="break-words"
                              style={{
                                color:
                                  'var(--portfolio-text)',
                                fontSize:
                                  'var(--portfolio-card-title-size)',
                                fontWeight: 700,
                              }}
                            >
                              {education.degree}
                            </h3>

                            <p
                              className="mt-1 break-words"
                              style={{
                                color:
                                  'var(--portfolio-text-soft)',
                                fontSize:
                                  'var(--portfolio-body-size)',
                              }}
                            >
                              {education.institution}
                            </p>
                          </div>

                          <p
                            className="shrink-0"
                            style={{
                              color:
                                'var(--portfolio-text-muted)',
                              fontSize:
                                'var(--portfolio-body-size)',
                              fontWeight: 500,
                            }}
                          >
                            {education.timePeriod}
                          </p>
                        </div>

                        {(education.cgpa ||
                          education.percentage) && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {education.cgpa && (
                                <span
                                  className="rounded-full px-3 py-1.5 font-semibold"
                                  style={{
                                    background:
                                      'var(--portfolio-card-bg-solid)',
                                    color:
                                      'var(--portfolio-text-soft)',
                                    fontSize:
                                      'var(--portfolio-small-size)',
                                  }}
                                >
                                  CGPA{' '}
                                  {education.cgpa}
                                </span>
                              )}

                              {education.percentage && (
                                <span
                                  className="rounded-full px-3 py-1.5 font-semibold"
                                  style={{
                                    background:
                                      'var(--portfolio-card-bg-solid)',
                                    color:
                                      'var(--portfolio-text-soft)',
                                    fontSize:
                                      'var(--portfolio-small-size)',
                                  }}
                                >
                                  {
                                    education.percentage
                                  }
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================== */}
      {/* PROJECTS */}
      {/* ======================================== */}

      {projects?.length > 0 && (
        <section className="portfolio-card min-w-0 overflow-hidden">
          <SectionHeader>
            Projects
          </SectionHeader>

          <div
            className="mt-7 min-w-0"
            style={
              projects.length > 3
                ? {
                  maxHeight:
                    'var(--portfolio-project-max-height)',
                  overflowY: 'auto',
                  paddingRight:
                    'var(--portfolio-scroll-padding)',
                }
                : undefined
            }
          >
            <div
              className="min-w-0"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap:
                  'var(--portfolio-project-gap)',
              }}
            >
              {projects.map(
                (project) => (
                  <article
                    key={project._id}
                    className="min-w-0 rounded-2xl border p-5 transition"
                    style={{
                      background:
                        'var(--portfolio-card-bg-solid)',
                      borderColor:
                        'var(--portfolio-line)',
                    }}
                  >
                    {/* Project title + links */}

                    <div className="flex min-w-0 items-start justify-between gap-4">
                      <h3
                        className="min-w-0 break-words"
                        style={{
                          color:
                            'var(--portfolio-text)',
                          fontSize:
                            'var(--portfolio-card-title-size)',
                          fontWeight: 700,
                        }}
                      >
                        {project.name}
                      </h3>

                      <div className="flex shrink-0 items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={
                              project.githubUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="flex items-center justify-center rounded-full transition"
                            style={{
                              width:
                                'var(--portfolio-project-icon-button-size)',
                              height:
                                'var(--portfolio-project-icon-button-size)',
                              border:
                                '1px solid var(--portfolio-line)',
                              color:
                                'var(--portfolio-text-soft)',
                            }}
                          >
                            <GitBranch
                              size={17}
                              strokeWidth={1.8}
                            />
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={
                              project.liveUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Live project"
                            className="flex items-center justify-center rounded-full transition"
                            style={{
                              width:
                                'var(--portfolio-project-icon-button-size)',
                              height:
                                'var(--portfolio-project-icon-button-size)',
                              border:
                                '1px solid var(--portfolio-line)',
                              color:
                                'var(--portfolio-text-soft)',
                            }}
                          >
                            <ExternalLink
                              size={17}
                              strokeWidth={1.8}
                            />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Technologies */}

                    {project.technologies?.length >
                      0 && (
                        <div className="mt-4 flex min-w-0 flex-wrap gap-2">
                          {project.technologies.map(
                            (
                              technology,
                              index,
                            ) => (
                              <span
                                key={`${technology}-${index}`}
                                className="rounded-full px-3 py-1.5 font-semibold"
                                style={{
                                  background:
                                    'var(--portfolio-green-soft)',
                                  color:
                                    'var(--portfolio-green-dark)',
                                  fontSize:
                                    'var(--portfolio-small-size)',
                                }}
                              >
                                {technology}
                              </span>
                            ),
                          )}
                        </div>
                      )}

                    {/* Description */}

                    <p
                      className="mt-4 whitespace-pre-line break-words"
                      style={{
                        color:
                          'var(--portfolio-text-soft)',
                        fontSize:
                          'var(--portfolio-body-size)',
                        lineHeight:
                          'var(--portfolio-line-height)',
                      }}
                    >
                      {project.description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default RightSection