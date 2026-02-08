/**
 * Learn index - visual part browser with progress
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DEEP_PART_IDS, DEEP_PARTS } from '../../data/deepLearning'
import { useProgress } from '../../context/ProgressContext'
import PartImage from '../PartImage'

export default function LearnIndex() {
  const { completedCount, totalModules, isModuleComplete } = useProgress()
  const total = totalModules || DEEP_PART_IDS.length

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Learn the Parts
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-4">
          Each part has a full module: what it is, what it does, communication, problems, symptoms, mistakes, and real examples.
        </p>
        <p className="text-sm text-rose-600 dark:text-rose-400 italic mb-4">My precious little princess, you&apos;re going to learn so much. I believe in you. 💕</p>
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-xs h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / total) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-pc-accent to-pc-teal rounded-full"
            />
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {completedCount} of {total} completed
          </span>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEEP_PART_IDS.map((id, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/learn/${id}`}
              className="group block bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 hover:border-pc-accent/50 hover:shadow-md transition-all"
            >
              <div className="p-6 flex items-center gap-4">
                <PartImage partId={id} size="xl" className="group-hover:scale-105 transition-transform" />
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-pc-accent transition-colors">
                    {DEEP_PARTS[id]?.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{DEEP_PARTS[id]?.subtitle}</p>
                  {isModuleComplete(id) && (
                    <span className="inline-block mt-2 text-xs font-medium text-pc-teal">✓ Completed</span>
                  )}
                </div>
                <span className="text-slate-300 group-hover:text-pc-accent group-hover:translate-x-1 transition-all">→</span>
              </div>
              <div className="h-0.5 bg-pc-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
