import {
  useEffect,
  useState,
} from 'react'

import cloud from '../../assets/cloud.svg'

function Cloud({
  className = '',
  direction = 'right',
  duration = 28,
  delay = 0,
  scale = 1,
}) {
  const animation =
    direction === 'right'
      ? 'portfolioCloudRight'
      : 'portfolioCloudLeft'

  return (
    <div
      className={`portfolio-cloud pointer-events-none absolute ${className}`}
      style={{
        animation: `${animation} ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        willChange: 'transform',
        width: `${380 * scale}px`,
        opacity:
          'var(--portfolio-cloud-opacity)',
      }}
    >
      <img
        src={cloud}
        alt=""
        draggable="false"
        className="block h-auto w-full"
        style={{
          filter:
            'var(--portfolio-cloud-filter)',
        }}
      />
    </div>
  )
}

function PortfolioBackground() {
  const [
    scrollProgress,
    setScrollProgress,
  ] = useState(0)

  useEffect(() => {
    const updateBackground = () => {
      const scrollTop =
        window.scrollY

      const documentHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight

      if (documentHeight <= 0) {
        setScrollProgress(0)
        return
      }

      setScrollProgress(
        Math.min(
          scrollTop /
            documentHeight,
          1,
        ),
      )
    }

    updateBackground()

    window.addEventListener(
      'scroll',
      updateBackground,
      { passive: true },
    )

    window.addEventListener(
      'resize',
      updateBackground,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        updateBackground,
      )

      window.removeEventListener(
        'resize',
        updateBackground,
      )
    }
  }, [])

  const greenStrength =
    0.08 +
    scrollProgress * 0.22

  return (
    <>
      <style>
        {`
          @keyframes portfolioCloudRight {
            0% {
              transform: translate3d(-40vw, 0, 0);
            }

            100% {
              transform: translate3d(140vw, 0, 0);
            }
          }

          @keyframes portfolioCloudLeft {
            0% {
              transform: translate3d(140vw, 0, 0);
            }

            100% {
              transform: translate3d(-40vw, 0, 0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .portfolio-cloud {
              animation: none !important;
            }
          }
        `}
      </style>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        {/* Background */}

        <div
          className="absolute inset-0"
          style={{
            background:
              'var(--portfolio-page-bg)',
          }}
        />

        {/* Ground glow */}

        <div
          className="absolute bottom-0 left-0 right-0 h-[60%]"
          style={{
            opacity: greenStrength,
            background:
              'var(--portfolio-ground-glow)',
          }}
        />

        {/* Sky / moon glow */}

        <div
          className="absolute left-1/2 top-[-18rem] h-[40rem] w-[55rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              'var(--portfolio-sky-glow)',
          }}
        />

        {/* -------------------------------- */}
        {/* Clouds                           */}
        {/* -------------------------------- */}

        <Cloud
          className="left-0 top-[8%]"
          direction="right"
          duration={34}
          delay={-12}
          scale={0.95}
        />

        <Cloud
          className="left-0 top-[20%]"
          direction="left"
          duration={43}
          delay={-25}
          scale={0.65}
        />

        <Cloud
          className="left-0 top-[33%]"
          direction="right"
          duration={38}
          delay={-5}
          scale={0.78}
        />

        <Cloud
          className="left-0 top-[47%]"
          direction="left"
          duration={48}
          delay={-31}
          scale={0.52}
        />

        <Cloud
          className="left-0 top-[58%]"
          direction="right"
          duration={45}
          delay={-20}
          scale={0.4}
        />

        {/* Bottom ground */}

        <div
          className="absolute bottom-0 left-0 right-0 h-28"
          style={{
            background:
              'linear-gradient(to top, var(--portfolio-ground-overlay), transparent)',
          }}
        />
      </div>
    </>
  )
}

export default PortfolioBackground