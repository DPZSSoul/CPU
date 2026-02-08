/**
 * Progress Dashboard - topics completed, quiz scores, diagnosis rate
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../../context/ProgressContext'
import { DEEP_PART_IDS, DEEP_PARTS } from '../../data/deepLearning'
import PartImage from '../PartImage'
import CompletionCertificate from '../Certificate/CompletionCertificate'

export default function ProgressDashboard() {
  const {
    completedCount,
    totalModules,
    overallProgress,
    completedModules,
    isModuleComplete,
    getOverallQuizStats,
    diagnosisRate,
    diagnosisAttempts,
    diagnosisSuccesses,
    streakDays,
    badges,
    resetProgress,
  } = useProgress()

  const quizStats = getOverallQuizStats()

  const allComplete = completedCount === totalModules

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Progress Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your learning. Topics completed, quiz scores, and diagnosis success.
          </p>
        </div>
        <button
          onClick={() => window.confirm('Reset all progress? This cannot be undone.') && resetProgress()}
          className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          Reset progress
        </button>
      </div>

      {/* Completion certificate */}
      {allComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <CompletionCertificate />
        </motion.div>
      )}

      {/* Streak & badges */}
      {(streakDays > 0 || badges?.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap gap-4"
        >
          {streakDays > 0 && (
            <div className="px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 font-medium">
              🔥 {streakDays} day streak
            </div>
          )}
          {badges?.map((b) => (
            <div key={b.id} className="px-4 py-2 rounded-xl bg-pc-accent/20 text-pc-accent font-medium" title={b.desc}>
              🏆 {b.name}
            </div>
          ))}
        </motion.div>
      )}

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-6 mb-8"
      >
        <h2 className="font-bold text-slate-800 dark:text-white mb-4">Overall progress</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.6 }}
              className="h-full bg-pc-accent rounded-full"
            />
          </div>
          <span className="font-bold text-slate-800 dark:text-white">{overallProgress}%</span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          {completedCount} of {totalModules} learning modules completed
        </p>
      </motion.div>

      {/* Topics completed */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-6 mb-8"
      >
        <h2 className="font-bold text-slate-800 dark:text-white mb-4">Parts knowledge</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {DEEP_PART_IDS.map((id) => (
            <Link
              key={id}
              to={`/learn/${id}`}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                isModuleComplete(id)
                  ? 'border-pc-mint bg-pc-mint/10 dark:bg-pc-mint/20'
                  : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
              }`}
            >
              <PartImage partId={id} size="md" />
              <span className="font-medium text-slate-800 dark:text-white">{DEEP_PARTS[id]?.name}</span>
              {isModuleComplete(id) && (
                <span className="ml-auto text-pc-teal font-bold">✓</span>
              )}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Quiz stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-6 mb-8"
      >
        <h2 className="font-bold text-slate-800 dark:text-white mb-4">Quiz scores</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-slate-600 dark:text-slate-400">Attempts</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{quizStats.attempts}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400">Best score</p>
            <p className="text-2xl font-bold text-pc-accent">{quizStats.bestScore}%</p>
          </div>
        </div>
        <Link
          to="/quiz"
          className="inline-block mt-4 text-pc-accent font-medium hover:underline"
        >
          Take a quiz →
        </Link>
      </motion.div>

      {/* Diagnosis stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-6"
      >
        <h2 className="font-bold text-slate-800 dark:text-white mb-4">Diagnosis simulator</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-slate-600 dark:text-slate-400">Scenarios attempted</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{diagnosisAttempts}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400">Correct diagnoses</p>
            <p className="text-2xl font-bold text-pc-teal">{diagnosisSuccesses}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400">Success rate</p>
            <p className="text-2xl font-bold text-pc-accent">{diagnosisRate}%</p>
          </div>
        </div>
        <Link
          to="/diagnose"
          className="inline-block mt-4 text-pc-accent font-medium hover:underline"
        >
          Practice diagnosis →
        </Link>
      </motion.div>
    </div>
  )
}
