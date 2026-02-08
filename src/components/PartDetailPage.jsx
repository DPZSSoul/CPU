import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PARTS } from '../data/partsData'

/**
 * Individual part learning page - large illustration, friend-talk, analogy
 */
export default function PartDetailPage({ learningMode }) {
  const { partId } = useParams()
  const part = PARTS.find((p) => p.id === partId)

  if (!part || part.id === 'case' || part.id === 'cables') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-600">Part not found.</p>
        <Link to="/parts" className="text-pc-blue font-medium hover:underline mt-4 inline-block">
          ← Back to parts
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12 safe-area-padding"
    >
      {/* Back link */}
      <Link
        to="/parts"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-pc-blue font-medium mb-8 transition-colors"
      >
        ← Back to all parts
      </Link>

      {/* Large illustration / emoji */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="text-8xl sm:text-9xl mb-8 text-center"
        aria-hidden="true"
      >
        {part.emoji}
      </motion.div>

      <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6 text-center">
        {part.name}
      </h1>

      {/* What it does */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">What it does</h2>
        <p className="text-lg text-slate-600">{part.whatItDoes}</p>
      </div>

      {/* Fun analogy */}
      <div className="bg-pc-mint/20 rounded-2xl p-6 sm:p-8 border-2 border-pc-mint/50 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">Fun analogy</h2>
        <p className="text-lg text-slate-600">"{part.funAnalogy}"</p>
      </div>

      {/* What happens if you don't have it */}
      <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 border-2 border-amber-200 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">What happens without it?</h2>
        <p className="text-lg text-slate-600">{part.whatHappensWithout}</p>
      </div>

      {/* Explain mode extra */}
      {learningMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-6"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-3">Extra details</h2>
          <p className="text-slate-600 mb-3">{part.explainMore}</p>
          {part.explainDetails && (
            <p className="text-slate-600">{part.explainDetails}</p>
          )}
        </motion.div>
      )}

      {/* CTA: Show me where it goes */}
      <div className="text-center">
        <Link
          to="/build"
          className="
            inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl
            bg-gradient-to-r from-pc-blue to-pc-purple text-white
            shadow-lg hover:shadow-xl hover:scale-105 transition-all
            focus:outline-none focus-visible:ring-4 focus-visible:ring-pc-blue/50
          "
        >
          Show me where this goes →
        </Link>
      </div>
    </motion.div>
  )
}
