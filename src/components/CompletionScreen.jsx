import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PARTS, BUILD_ORDER } from '../data/partsData'
import { playComplete } from '../utils/sounds'
import { fireCompleteConfetti } from '../utils/confetti'

/**
 * Completion screen - celebration animation + summary
 */
export default function CompletionScreen({ setBuildComplete }) {
  const handleRestart = () => {
    setBuildComplete(false)
  }

  useEffect(() => {
    playComplete()
    fireCompleteConfetti()
  }, [])

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-20 safe-area-padding">
      <div className="text-center">
        {/* Celebration */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-7xl sm:text-8xl mb-6"
        >
          🎉
        </motion.div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4">
            You Built a PC!
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-slate-600 mb-4"
        >
          Nice work! You now know where each part goes and why it matters.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-rose-600 dark:text-rose-400 italic mb-12"
        >
          Good girl. Your daddy&apos;s good girl. I&apos;m so proud of you. Love you always. 💕
        </motion.p>

        {/* Summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 text-left mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6">What you built</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BUILD_ORDER.map((partId, i) => {
              const part = PARTS.find((p) => p.id === partId)
              if (!part) return null
              return (
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-pc-mint/50 transition-colors"
                >
                  <span className="text-3xl">{part.emoji}</span>
                  <div>
                    <h3 className="font-bold text-slate-800">{part.name}</h3>
                    <p className="text-sm text-slate-600">{part.whatItDoes}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/build"
            onClick={handleRestart}
            className="
              inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl
              bg-gradient-to-r from-pc-blue to-pc-purple text-white
              shadow-lg hover:shadow-xl hover:scale-105 transition-all
              focus:outline-none focus-visible:ring-4 focus-visible:ring-pc-blue/50
            "
          >
            🔄 Rebuild
          </Link>
          <Link
            to="/compatibility"
            className="
              inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl
              bg-white border-2 border-pc-blue text-pc-blue
              hover:bg-pc-blue/5 hover:scale-105 transition-all
              focus:outline-none focus-visible:ring-4 focus-visible:ring-pc-blue/50
            "
          >
            📚 Compatibility Basics
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
