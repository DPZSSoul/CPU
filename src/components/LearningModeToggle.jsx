import { motion } from 'framer-motion'

/**
 * Toggle between "Fun Mode" (minimal text) and "Explain More" mode (extra details)
 */
export default function LearningModeToggle({ learningMode, setLearningMode }) {
  return (
    <motion.button
      onClick={() => setLearningMode(!learningMode)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm
        transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-purple
        ${learningMode
          ? 'bg-pc-purple text-white shadow-md'
          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
        }
      `}
      aria-pressed={learningMode}
      aria-label={learningMode ? 'Switch to Fun Mode (less text)' : 'Switch to Explain More mode (extra details)'}
    >
      <span className="hidden sm:inline">
        {learningMode ? 'Explain More ✓' : 'Fun Mode'}
      </span>
      <span className="text-lg" title={learningMode ? 'Extra details on' : 'Extra details off'}>
        {learningMode ? '📚' : '🎮'}
      </span>
    </motion.button>
  )
}
