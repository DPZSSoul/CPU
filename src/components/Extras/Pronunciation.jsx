import { motion } from 'framer-motion'
import { PRONUNCIATIONS } from '../../data/pronunciation'

export default function Pronunciation() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">How to Say It</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">PC terms and how to pronounce them when talking to others.</p>

      <div className="space-y-4">
        {PRONUNCIATIONS.map((p, i) => (
          <motion.div
            key={p.term}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-pc-blue">{p.term}</span>
              <span className="text-slate-600 dark:text-slate-400 text-sm">{p.note}</span>
            </div>
            <p className="mt-2 font-medium text-slate-800 dark:text-white">{p.say}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
