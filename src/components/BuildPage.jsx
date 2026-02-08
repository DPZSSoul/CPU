import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import InteractiveBuild from './InteractiveBuild'

/**
 * Build page - hosts the interactive drag-and-drop build
 * Redirects to completion when done
 */
export default function BuildPage({ learningMode, buildComplete, setBuildComplete }) {
  const navigate = useNavigate()

  const handleComplete = () => {
    setBuildComplete(true)
    navigate('/complete')
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 safe-area-padding"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
          Interactive Build
        </h1>
        <p className="text-lg text-slate-600">
          Drag each part into the correct spot. Then connect the cables! Order matters.
        </p>
      </div>

      <InteractiveBuild
        learningMode={learningMode}
        onComplete={handleComplete}
      />
    </motion.section>
  )
}
