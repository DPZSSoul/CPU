import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MYTHS } from '../../data/myths'

export default function MythVsFact() {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const m = MYTHS[index]

  const next = () => {
    setRevealed(false)
    setIndex((i) => (i + 1) % MYTHS.length)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Myth vs Fact</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Common PC beliefs, what&apos;s true and what&apos;s not.</p>

      <motion.div
        key={index}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-card"
      >
        <p className="font-medium text-slate-700 dark:text-slate-300 mb-4">&quot;{m.myth}&quot;</p>
        <p className="text-sm text-slate-500 mb-2">Myth or fact?</p>
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="px-4 py-2 bg-pc-blue text-white rounded-xl font-medium hover:bg-pc-purple transition-colors"
          >
            Reveal
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4"
            >
              <p className={`font-semibold ${m.isTrue ? 'text-emerald-600' : 'text-amber-600'}`}>
                {m.isTrue ? 'Fact' : 'Myth'}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{m.fact}</p>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-slate-500">{index + 1} / {MYTHS.length}</span>
        <button
          onClick={next}
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
