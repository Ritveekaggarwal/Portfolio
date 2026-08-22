import { Download } from 'lucide-react'
import cv from '../../assets/Ritveek_Aggarwal_Resume.pdf'

function CVButton() {
  return (
    <a
      href={cv}
      download="Ritveek_Aggarwal_CV.pdf"
      className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-[#e4eaf0] px-4 py-3 transition hover:bg-[#dbe2e9]"
    >
      <Download
        size={17}
        strokeWidth={1.8}
        className="shrink-0 text-[#60799d]"
      />

      <span className="text-sm font-semibold text-slate-600">
        Download CV
      </span>
    </a>
  )
}

export default CVButton