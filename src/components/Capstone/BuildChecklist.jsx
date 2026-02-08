/**
 * Build Readiness Checklist - mark tasks as complete
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CAPSTONE_TASKS } from '../../data/capstoneTasks'

const STORAGE_KEY = 'pc-capstone-tasks'

function loadCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function saveCompleted(completed) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  } catch {}
}

export default function BuildChecklist() {
  const [completed, setCompleted] = useState(loadCompleted)

  useEffect(() => {
    saveCompleted(completed)
  }, [completed])

  const toggle = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const totalTasks = CAPSTONE_TASKS.reduce((s, p) => s + p.tasks.length, 0)
  const doneCount = Object.values(completed).filter(Boolean).length
  const progress = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/quiz" className="text-pc-blue font-medium mb-6 inline-block hover:underline">← Back to quizzes</Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Build Readiness Checklist
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Mark each task as you learn or complete it. Covers prep, install order, first boot, and troubleshooting.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-pc-blue to-pc-teal rounded-full"
            />
          </div>
          <span className="font-bold text-slate-800 dark:text-white">{doneCount}/{totalTasks}</span>
        </div>
      </motion.div>

      <div className="space-y-8">
        {CAPSTONE_TASKS.map((phase, pi) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">{phase.phase}</h2>
            </div>
            <ul className="divide-y divide-slate-200 dark:divide-slate-600">
              {phase.tasks.map((task, ti) => (
                <li key={task.id}>
                  <button
                    onClick={() => toggle(task.id)}
                    className={`w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${
                      completed[task.id] ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''
                    }`}
                  >
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      completed[task.id]
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {completed[task.id] ? '✓' : ''}
                    </span>
                    <span className={completed[task.id] ? 'text-slate-600 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-white'}>
                      {task.text}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-pc-teal/20 border-2 border-emerald-400/50 text-center"
        >
          <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">Good job, pumpkin! Checklist complete! 🌟</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">You&apos;ve reviewed the full build flow, you&apos;re so ready to build. Good girl. I&apos;m so proud of you. Love you always. 💕</p>
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-500 transition-colors"
          >
            View progress
          </Link>
        </motion.div>
      )}
    </div>
  )
}
