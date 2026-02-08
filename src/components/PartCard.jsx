import { Link } from 'react-router-dom'
import { PARTS } from '../data/partsData'

/**
 * Card for a single PC part - used on Parts Overview page
 * Shows: big emoji, simple explanation, "Why it matters", optional extra details
 */
export default function PartCard({ partId, learningMode }) {
  const part = PARTS.find((p) => p.id === partId)
  if (!part || part.id === 'case') return null

  return (
    <article
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow"
      id={part.id}
    >
      {/* Big emoji/illustration */}
      <div className="text-6xl sm:text-7xl mb-4" aria-hidden="true">
        {part.emoji}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
        {part.name}
      </h2>

      {/* What this part does - always visible */}
      <p className="text-lg text-slate-600 mb-3">
        {part.whatItDoes}
      </p>

      {/* Why it matters - always visible */}
      <p className="text-base text-slate-500 font-medium">
        <span className="text-pc-teal">Why it matters:</span> {part.whyItMatters}
      </p>

      {/* Extra details - only in Explain More mode */}
      {learningMode && (
        <p className="mt-4 pt-4 border-t border-slate-200 text-slate-600">
          {part.explainMore}
        </p>
      )}

      {/* CTA: See where it goes */}
      <Link
        to="/build"
        className="
          mt-6 inline-flex items-center gap-2 px-6 py-3
          bg-pc-blue text-white font-bold rounded-xl
          hover:bg-pc-purple transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-blue focus-visible:ring-offset-2
        "
      >
        See where it goes →
      </Link>
    </article>
  )
}
