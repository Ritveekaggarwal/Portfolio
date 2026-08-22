import {
  Mail,
  MapPin,
  Phone,
  ExternalLink,
} from 'lucide-react'

import avatar from '../../assets/Avatar.png'
import CVButton from './CVButton'

const skillColors = [
  {
    background: '#e6f2d8',
    text: '#52763a',
  },
  {
    background: '#dcecfb',
    text: '#3569aa',
  },
  {
    background: '#fbe5d2',
    text: '#af651c',
  },
  {
    background: '#eadff8',
    text: '#7650a7',
  },
  {
    background: '#f9dce7',
    text: '#b3476d',
  },
  {
    background: '#f9edc9',
    text: '#9a7418',
  },
]

const getSkillColor = (skill) => {
  let hash = 0

  for (let i = 0; i < skill.length; i += 1) {
    hash =
      skill.charCodeAt(i) +
      ((hash << 5) - hash)
  }

  return skillColors[
    Math.abs(hash) % skillColors.length
  ]
}

function LeftSection({ profile }) {
  return (
    <aside className="lg:sticky lg:top-8 lg:h-fit">

      <div className="portfolio-card">

        {/* Avatar */}

        <div
          className="overflow-hidden"
          style={{
            height:
              'var(--portfolio-avatar-height)',

            borderRadius:
              'var(--portfolio-avatar-radius)',

            background:
              'var(--portfolio-page-bg)',
          }}
        >
          <div className="flex h-full items-end justify-center">
            <img
              src={avatar}
              alt={profile.name}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Identity */}

        <div className="pt-5 text-center">

          <h1 className="portfolio-title tracking-tight">
            {profile.name}
          </h1>

          {profile.title && (
            <p
              className="mt-1 font-medium leading-6"
              style={{
                color:
                  'var(--portfolio-text-muted)',

                fontSize:
                  'var(--portfolio-body-size)',
              }}
            >
              {profile.title}
            </p>
          )}

        </div>

        {/* Phone + Email */}

        <div className="mt-4 space-y-1">

          {profile.phone && (
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 rounded-xl px-2 py-2 transition"
              style={{
                color:
                  'var(--portfolio-text-soft)',
                fontSize:
                  'var(--portfolio-body-size)',
              }}
            >
              <Phone
                size={16}
                strokeWidth={1.8}
                style={{
                  color:
                    'var(--portfolio-icon)',
                }}
                className="shrink-0"
              />

              <span className="truncate">
                {profile.phone}
              </span>
            </a>
          )}

          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl px-2 py-2 transition"
              style={{
                color:
                  'var(--portfolio-text-soft)',
                fontSize:
                  'var(--portfolio-body-size)',
              }}
            >
              <Mail
                size={16}
                strokeWidth={1.8}
                style={{
                  color:
                    'var(--portfolio-icon)',
                }}
                className="shrink-0"
              />

              <span className="truncate">
                {profile.email}
              </span>
            </a>
          )}

        </div>

        {/* Download CV */}

        <CVButton />

        {/* Location */}

        {profile.location && (
          <div
            className="mt-3 flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{
              background:
                'var(--portfolio-muted-bg)',
            }}
          >
            <MapPin
              size={17}
              strokeWidth={1.8}
              style={{
                color:
                  'var(--portfolio-location-icon)',
              }}
              className="shrink-0"
            />

            <span
              className="min-w-0 break-words font-semibold"
              style={{
                color:
                  'var(--portfolio-text-soft)',

                fontSize:
                  'var(--portfolio-body-size)',
              }}
            >
              {profile.location}
            </span>
          </div>
        )}

        {/* Skills */}

        {profile.skills?.length > 0 && (
          <div className="mt-7">

            <p
              className="font-bold uppercase tracking-[0.18em]"
              style={{
                color:
                  'var(--portfolio-text-muted)',

                fontSize:
                  'var(--portfolio-small-size)',
              }}
            >
              Skills
            </p>

            <div className="mt-3 flex flex-wrap gap-2">

              {profile.skills.map(
                (skill) => {
                  const color =
                    getSkillColor(skill)

                  return (
                    <span
                      key={skill}
                      className="rounded-full px-3.5 py-1.5 font-semibold"
                      style={{
                        background:
                          color.background,

                        color:
                          color.text,

                        fontSize:
                          'var(--portfolio-small-size)',
                      }}
                    >
                      {skill}
                    </span>
                  )
                },
              )}

            </div>

          </div>
        )}

        {/* Social Links */}

        {profile.socialLinks?.length > 0 && (
          <div className="mt-7">

            <p
              className="font-bold uppercase tracking-[0.18em]"
              style={{
                color:
                  'var(--portfolio-text-muted)',

                fontSize:
                  'var(--portfolio-small-size)',
              }}
            >
              Links
            </p>

            <div className="mt-3 space-y-2">

              {profile.socialLinks.map(
                (social) => (
                  <a
                    key={social._id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl px-4 py-3 transition"
                    style={{
                      background:
                        'var(--portfolio-soft-bg)',

                      color:
                        'var(--portfolio-text)',

                      fontSize:
                        'var(--portfolio-body-size)',
                    }}
                  >
                    <span className="min-w-0 truncate font-semibold">
                      {social.name}
                    </span>

                    <ExternalLink
                      size={15}
                      strokeWidth={1.8}
                      style={{
                        color:
                          'var(--portfolio-icon-muted)',
                      }}
                      className="ml-3 shrink-0"
                    />
                  </a>
                ),
              )}

            </div>

          </div>
        )}

      </div>

    </aside>
  )
}

export default LeftSection