import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { useNavigate } from 'react-router-dom'

import poster from '../assets/poster.png'
import grass from '../assets/grass.jpg'
import homeVideo from '../assets/home.mp4'

function LandingPage() {
  const navigate = useNavigate()

  const homeRef = useRef(null)
  const videoRef = useRef(null)

  const animationFrameRef = useRef(null)
  const fallbackTimerRef = useRef(null)

  const startTimeRef = useRef(0)

  const targetXRef = useRef(0)
  const targetYRef = useRef(0)

  const currentXRef = useRef(0)
  const currentYRef = useRef(0)

  const [playing, setPlaying] = useState(false)
  const [completed, setCompleted] = useState(false)

  const goToPortfolio = () => {
    navigate('/portfolio')
  }

  // -----------------------------------------
  // Video completion
  // -----------------------------------------

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const handleEnded = () => {
      if (completed) {
        return
      }

      setCompleted(true)

      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
        fallbackTimerRef.current = null
      }

      goToPortfolio()
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('ended', handleEnded)

      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
        fallbackTimerRef.current = null
      }
    }
  }, [completed])

  // -----------------------------------------
  // Desktop parallax
  // -----------------------------------------

  useEffect(() => {
    const home = homeRef.current
    const video = videoRef.current

    if (!home || !video) {
      return
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches

    if (reduceMotion || !finePointer) {
      return
    }

    const handleMove = (event) => {
      const rect = home.getBoundingClientRect()

      const width = rect.width || window.innerWidth
      const height = rect.height || window.innerHeight

      targetXRef.current =
        (event.clientX -
          rect.left -
          width / 2) /
        (width / 2)

      targetYRef.current =
        (event.clientY -
          rect.top -
          height / 2) /
        (height / 2)
    }

    const handleLeave = () => {
      targetXRef.current = 0
      targetYRef.current = 0
    }

    const loop = (now) => {
      if (!startTimeRef.current) {
        startTimeRef.current = now
      }

      const elapsed =
        now - startTimeRef.current

      const bob =
        Math.sin(
          (elapsed / 3400) *
            Math.PI *
            2,
        ) * 1.1

      currentXRef.current +=
        (targetXRef.current -
          currentXRef.current) *
        0.09

      currentYRef.current +=
        (targetYRef.current -
          currentYRef.current) *
        0.09

      const x =
        currentXRef.current * 2.2

      const y =
        bob +
        currentYRef.current * 1.6

      const rotate =
        currentXRef.current * 1.8

      video.style.transform =
        `translate(${x}%, ${y}%) scale(1.08) rotate(${rotate}deg)`

      animationFrameRef.current =
        requestAnimationFrame(loop)
    }

    home.addEventListener(
      'mousemove',
      handleMove,
    )

    home.addEventListener(
      'mouseleave',
      handleLeave,
    )

    animationFrameRef.current =
      requestAnimationFrame(loop)

    return () => {
      home.removeEventListener(
        'mousemove',
        handleMove,
      )

      home.removeEventListener(
        'mouseleave',
        handleLeave,
      )

      if (animationFrameRef.current) {
        cancelAnimationFrame(
          animationFrameRef.current,
        )
      }
    }
  }, [])

  // -----------------------------------------
  // Start animation
  // -----------------------------------------

  const handleEnter = async () => {
    if (playing || completed) {
      return
    }

    const video = videoRef.current

    if (!video) {
      goToPortfolio()
      return
    }

    setPlaying(true)

    try {
      video.currentTime = 0

      await video.play()

      fallbackTimerRef.current =
        window.setTimeout(() => {
          if (!completed) {
            goToPortfolio()
          }
        }, 1500)
    } catch {
      goToPortfolio()
    }
  }

  return (
    <main
      ref={homeRef}
      onClick={handleEnter}
      className="fixed inset-0 overflow-hidden bg-[#9ccb6a]"
      style={{
        backgroundImage: `url(${grass})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster={poster}
        src={homeVideo}
        aria-label="Portfolio introduction"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          transform:
            'translate(0%, 0%) scale(1.08)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* CTA */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          handleEnter()
        }}
        className="
          absolute
          left-1/2
          z-20
          rounded-full
          border
          border-white/90
          bg-white/75
          px-5
          py-2.5
          text-sm
          font-bold
          text-[#234f28]
          shadow-[0_12px_28px_rgba(26,60,28,0.26)]
          backdrop-blur-md
          transition
          duration-300
          hover:scale-105
          active:scale-95
          sm:px-6
          sm:py-3
        "
        style={{
          bottom: '8%',
          transform: playing
            ? 'translate(-50%, 8px)'
            : 'translate(-50%, 0)',
          opacity: playing ? 0 : 1,
          pointerEvents: playing
            ? 'none'
            : 'auto',
        }}
      >
        Tap to meet me
      </button>
    </main>
  )
}

export default LandingPage