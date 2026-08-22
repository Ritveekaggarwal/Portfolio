import BackToLanding from './BackToLanding'
import ThemeToggle from './ThemeToggle'

import PortfolioBackground from './PortfolioBackground'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import ContactSection from './ContactSection'
import Footer from './Footer'

function PortfolioLayout({
  profile,
  about,
  experiences,
  educations,
  projects,
}) {
  return (
    <div
      className="portfolio-page"
      style={{
        color:
          'var(--portfolio-text)',
      }}
    >
      <PortfolioBackground />

      <main
        className="relative"
        style={{
          paddingLeft:
            'var(--portfolio-page-padding-x)',

          paddingRight:
            'var(--portfolio-page-padding-x)',

          paddingTop:
            'var(--portfolio-page-padding-y)',

          paddingBottom:
            'var(--portfolio-page-padding-y)',
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth:
              'var(--portfolio-max-width)',
          }}
        >
          {/* Top controls */}

          <div
            className="flex items-center justify-between"
            style={{
              marginBottom:
                'var(--portfolio-section-gap)',
            }}
          >
            <BackToLanding />

            <ThemeToggle />
          </div>

          {/* Main content */}

          <div
            className="
              grid
              items-start
              lg:grid-cols-[var(--portfolio-left-width)_minmax(0,1fr)]
            "
            style={{
              gap:
                'var(--portfolio-content-gap)',
            }}
          >
            <LeftSection
              profile={profile}
            />

            <RightSection
              about={about}
              experiences={
                experiences
              }
              educations={
                educations
              }
              projects={projects}
            />
          </div>

          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PortfolioLayout