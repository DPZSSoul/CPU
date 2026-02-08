import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function DreamPC() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Build Your Dream PC</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        No budget limit. Pick the best parts for your ideal setup. Practice with the Professional Build tool.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-pc-purple/20 to-pc-blue/20 border border-pc-purple/30 dark:border-pc-purple/20"
      >
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          In the Professional Build mode, set your budget to a high number (e.g. $5000) and use-case to &quot;Gaming&quot; or &quot;Content Creation&quot; to explore top-tier parts.
        </p>
        <Link
          to="/build-pro"
          className="inline-block px-6 py-3 bg-pc-purple text-white font-medium rounded-xl hover:bg-pc-blue transition-colors"
        >
          Open Professional Build →
        </Link>
      </motion.div>
    </div>
  )
}
