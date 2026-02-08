/**
 * Quiz Index - pick a quiz topic
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { QUIZ_TOPICS } from '../../data/quizzes'
import { useProgress } from '../../context/ProgressContext'

const ACCENT = {
  'hardware-basics': 'from-amber-500/20 to-orange-500/20 border-amber-400/50',
  troubleshooting: 'from-rose-500/20 to-pink-500/20 border-rose-400/50',
  compatibility: 'from-violet-500/20 to-purple-500/20 border-violet-400/50',
  'build-order': 'from-emerald-500/20 to-teal-500/20 border-emerald-400/50',
  final: 'from-amber-500/30 to-yellow-500/30 border-amber-400 shadow-lg shadow-amber-500/20',
}

export default function QuizIndex() {
  const { getQuizStats, canAccessFinalQuiz } = useProgress()
  const finalUnlocked = canAccessFinalQuiz()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Quizzes & Knowledge Checks
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
          Test your understanding by topic. Complete each quiz, then tackle the Final Capstone to prove you're ready.
        </p>
      </motion.div>

      <div className="space-y-4">
        {QUIZ_TOPICS.map((topic, i) => {
          const stats = getQuizStats(topic.id)
          const best = stats.bestScore
          const isFinal = topic.id === 'final'
          const isLocked = isFinal && !finalUnlocked

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {isLocked ? (
                <div
                  className={`
                  group block p-6 rounded-2xl border-2
                  bg-gradient-to-br ${ACCENT[topic.id] || 'from-slate-500/10 to-slate-500/5 border-slate-200 dark:border-slate-600'}
                  dark:bg-slate-800/50 shadow-card opacity-75 cursor-not-allowed
                `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl opacity-70">🔒</span>
                      <div>
                        <h2 className="text-xl font-bold text-slate-600 dark:text-slate-500">
                          {topic.name}
                          <span className="ml-2 text-sm font-normal">(Locked)</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-0.5">{topic.desc}</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-2 font-medium">
                          Complete all 4 quizzes above with 70%+ to unlock
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              <Link
                to={`/quiz/${topic.id}`}
                className={`
                  group block p-6 rounded-2xl border-2
                  bg-gradient-to-br ${ACCENT[topic.id] || 'from-slate-500/10 to-slate-500/5 border-slate-200 dark:border-slate-600'}
                  hover:scale-[1.01] hover:shadow-card-hover hover:border-pc-blue/30
                  transition-all duration-200
                  dark:bg-slate-800/50 shadow-card
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{topic.icon}</span>
                    <div>
                      <h2 className={`text-xl font-bold ${isFinal ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                        {topic.name}
                        {isFinal && <span className="ml-2 text-sm font-normal">(Capstone)</span>}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">{topic.desc}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                        {topic.questions.length} questions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {stats.attempts > 0 && (
                      <span className="px-3 py-1 rounded-full bg-pc-blue/20 text-pc-blue text-sm font-medium">
                        Best: {best}%
                      </span>
                    )}
                    <span className="text-slate-400 dark:text-slate-500 group-hover:text-pc-blue group-hover:translate-x-1 transition-all">→</span>
                  </div>
                </div>
              </Link>
              )}
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10"
      >
        <Link
          to="/capstone"
          className="group block p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-pc-blue/50 hover:bg-pc-blue/5 dark:hover:bg-pc-blue/10 transition-all shadow-card"
        >
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">Build Readiness Checklist</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Step-by-step build order and troubleshooting flow. Mark each task as you go.
          </p>
        </Link>
      </motion.div>
    </div>
  )
}
