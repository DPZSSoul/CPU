import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LEARNING_PARTS } from '../data/partsData'

/**
 * Parts learning index - cards linking to each part's mini-page
 */
export default function PartsOverview({ learningMode }) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 safe-area-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Meet Your PC Parts
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Click any part to learn what it does, why it matters, and where it goes.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {LEARNING_PARTS.map((part, i) => (
          <motion.div
            key={part.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/parts/${part.id}`}
              className="
                block bg-white rounded-2xl p-6 sm:p-8 shadow-game border-2 border-slate-200
                hover:shadow-game-hover hover:border-pc-blue hover:scale-[1.02] transition-all duration-200
                focus:outline-none focus-visible:ring-4 focus-visible:ring-pc-blue/50 tap-target
              "
            >
              <div className="text-5xl sm:text-6xl mb-4">{part.emoji}</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                {part.name}
              </h2>
              <p className="text-slate-600 mb-4">{part.whatItDoes}</p>
              <span className="text-pc-blue font-semibold">
                Learn more →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA to build */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <Link
          to="/build"
          className="
            inline-block px-10 py-4 text-lg font-bold rounded-2xl
            bg-gradient-to-r from-pc-teal to-pc-blue text-white
            shadow-lg hover:shadow-xl hover:scale-105 transition-all
            focus:outline-none focus-visible:ring-4 focus-visible:ring-pc-teal/50
          "
        >
          Ready? Start the Interactive Build →
        </Link>
      </motion.div>
    </section>
  )
}
