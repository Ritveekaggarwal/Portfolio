import {
  Moon,
  Sun,
} from 'lucide-react'

import { useTheme } from '../../context/ThemeContext'

function ThemeToggle() {
  const {
    dark,
    toggleTheme,
  } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        dark
          ? 'Switch to light theme'
          : 'Switch to dark theme'
      }
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#34466f] shadow-sm transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
    >
      {dark ? (
        <Sun
          size={17}
          strokeWidth={1.8}
        />
      ) : (
        <Moon
          size={17}
          strokeWidth={1.8}
        />
      )}
    </button>
  )
}

export default ThemeToggle