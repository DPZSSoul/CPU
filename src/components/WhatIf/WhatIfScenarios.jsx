/**
 * What Would Happen If - interactive reveal scenarios
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WHAT_IF_SCENARIOS } from '../../data/whatIfScenarios'

export default function WhatIfScenarios() {
  const [revealed, setRevealed] = useState(new Set())

  const toggle = (id) => {
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          What Would Happen If...
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Explore common mistakes and their consequences. Click to reveal the answer.
        </p>
      </div>

      <div className="space-y-4">
        {WHAT_IF_SCENARIOS.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden bg-white dark:bg-slate-800"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <span className="font-medium text-slate-900 dark:text-white pr-4">{item.scenario}</span>
              <span className="text-pc-blue flex-shrink-0">
                {revealed.has(item.id) ? '▲' : '▼'}
              </span>
            </button>
            <AnimatePresence>
              {revealed.has(item.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pl-4 border-l-2 border-pc-teal">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
