import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function BackToLanding() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="group inline-flex items-center gap-2 rounded-full border backdrop-blur-md transition duration-200 hover:-translate-x-0.5"
      style={{
        borderColor:
          'var(--portfolio-card-border)',

        background:
          'var(--portfolio-card-bg)',

        color:
          'var(--portfolio-text)',

        boxShadow:
          'var(--portfolio-soft-shadow)',

        padding:
          '8px 16px',

        fontSize:
          'var(--portfolio-small-size)',

        fontWeight: 600,
      }}
    >
      <ArrowLeft
        size={16}
        strokeWidth={1.8}
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
        style={{
          color:
            'var(--portfolio-icon)',
        }}
      />

      <span>
        Back
      </span>
    </button>
  )
}

export default BackToLanding