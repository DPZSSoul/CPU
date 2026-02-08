/**
 * Quick 1-2 question Knowledge Check at end of each part
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PART_KNOWLEDGE_CHECKS } from '../../data/partKnowledgeChecks'

export default function PartKnowledgeCheck({ partId }) {
  const questions = PART_KNOWLEDGE_CHECKS[partId]
  const [answered, setAnswered] = useState([])
  const [selected, setSelected] = useState(null)
  const [current, setCurrent] = useState(0)

  if (!questions || questions.length === 0) return null

  const q = questions[current]
  const isLast = current >= questions.length - 1

  const handleSelect = (idx) => {
    if (answered.includes(current)) return
    setSelected(idx)
    setAnswered((prev) => [...prev, current])
    if (!isLast) setTimeout(() => { setCurrent((c) => c + 1); setSelected(null) }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-600"
    >
      <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">
        ✓ Check your understanding
      </h3>
      <p className="text-slate-700 dark:text-slate-300 mb-4">{q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          const wasSelected = selected === idx
          const isCorrect = idx === q.correct
          const showResult = answered.includes(current)
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered.includes(current)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                showResult && isCorrect
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : showResult && wasSelected && !isCorrect
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-pc-accent/50'
              }`}
            >
              <span className={showResult && isCorrect ? 'text-emerald-700 dark:text-emerald-300' : showResult && wasSelected && !isCorrect ? 'text-red-700 dark:text-red-300' : 'text-slate-800 dark:text-slate-200'}>
                {opt}
                {showResult && wasSelected && isCorrect && ' ✓'}
                {showResult && wasSelected && !isCorrect && ' ✗'}
              </span>
            </button>
          )
        })}
      </div>
      {answered.length === questions.length && (
        <p className="mt-4 text-pc-teal font-medium">Good job, pumpkin! Good girl, you&apos;re getting it. So proud of you for learning. 🌟💕</p>
      )}
    </motion.div>
  )
}
