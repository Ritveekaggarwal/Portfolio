import { useEffect, useState } from 'react'

import getPortfolioContent from '../services/portfolio.api'

import PortfolioLayout from '../components/portfolio/PortfolioLayout'

function PortfolioPage() {
  const [data, setData] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true)
        setError('')

        const portfolio =
          await getPortfolioContent()

        setData(portfolio)
      } catch (error) {
        console.error(
          'Portfolio loading error:',
          error,
        )

        setError(
          error.response?.data?.message ||
            'Failed to load portfolio',
        )
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  if (loading) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        style={{
          background:
            'var(--portfolio-page-bg)',
          color:
            'var(--portfolio-text)',
        }}
      >
        <div className="text-center">
          <div
            className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
            style={{
              borderColor:
                'var(--portfolio-line)',
              borderTopColor:
                'var(--portfolio-brand)',
            }}
          />

          <p
            className="mt-4 font-medium"
            style={{
              color:
                'var(--portfolio-text-soft)',
              fontSize:
                'var(--portfolio-body-size)',
            }}
          >
            Loading portfolio...
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-5"
        style={{
          background:
            'var(--portfolio-page-bg)',
          color:
            'var(--portfolio-text)',
        }}
      >
        <div
          className="w-full max-w-md text-center"
          style={{
            background:
              'var(--portfolio-card-bg)',
            border:
              '1px solid var(--portfolio-card-border)',
            borderRadius:
              'var(--portfolio-card-radius)',
            padding:
              'var(--portfolio-card-padding)',
            boxShadow:
              'var(--portfolio-card-shadow)',
            backdropFilter:
              'blur(14px)',
          }}
        >
          <h1
            className="font-extrabold"
            style={{
              color:
                'var(--portfolio-text)',
              fontSize:
                'var(--portfolio-section-title-size)',
            }}
          >
            Unable to load portfolio
          </h1>

          <p
            className="mt-2"
            style={{
              color:
                'var(--portfolio-text-soft)',
              fontSize:
                'var(--portfolio-body-size)',
            }}
          >
            {error}
          </p>
        </div>
      </main>
    )
  }

  if (!data) {
    return null
  }

  return (
    <PortfolioLayout
      profile={data.profile}
      about={data.about}
      experiences={data.experiences}
      educations={data.educations}
      projects={data.projects}
    />
  )
}

export default PortfolioPage