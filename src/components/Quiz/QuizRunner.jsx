/**
 * Quiz Runner - runs a specific quiz topic
 * Keyboard: N = Next, R = Retry
 * Session persistence: remembers position if tab closed
 */

import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { QUIZ_TOPICS } from '../../data/quizzes'
import { playSuccess, playWrong } from '../../utils/sounds'
import { useProgress } from '../../context/ProgressContext'

const QUIZ_STORAGE_KEY = 'pc-quiz-session'

function loadSavedState(topicId) {
  try {
    const raw = sessionStorage.getItem(QUIZ_STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data?.topicId !== topicId) return null
    return data
  } catch { return null }
}

function saveState(topicId, state) {
  if (state.quizComplete) return
  try {
    sessionStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify({
      topicId,
      index: state.index,
      selected: state.selected,
      shown: state.shown,
      responses: state.responses,
    }))
  } catch {}
}

export default function QuizRunner() {
  const { topicId } = useParams()
  const { recordQuiz, canAccessFinalQuiz } = useProgress()
  const topic = QUIZ_TOPICS.find((t) => t.id === topicId) || QUIZ_TOPICS[0]
  const questions = topic?.questions || []

  if (topic?.id === 'final' && !canAccessFinalQuiz()) {
    return <Navigate to="/quiz" replace />
  }

  const saved = loadSavedState(topicId)
  const [index, setIndex] = useState(saved?.index ?? 0)
  const [selected, setSelected] = useState(saved?.selected ?? null)
  const [shown, setShown] = useState(saved?.shown ?? false)
  const [responses, setResponses] = useState(saved?.responses ?? [])
  const [quizComplete, setQuizComplete] = useState(false)

  useEffect(() => {
    saveState(topicId, { index, selected, shown, responses, quizComplete })
  }, [topicId, index, selected, shown, responses, quizComplete])

  const question = questions[index]
  const isCorrect = selected && question?.options.find((o) => o.id === selected)?.correct

  const handleSelect = (optionId) => {
    if (shown) return
    setSelected(optionId)
    setShown(true)
    const opt = question.options.find((o) => o.id === optionId)
    setResponses((prev) => [...prev, { questionId: question.id, correct: opt?.correct, explanation: question.explanation }])
    if (opt?.correct) playSuccess()
    else playWrong()
  }

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      const correct = responses.filter((r) => r.correct).length
      recordQuiz(topic.id, correct, questions.length)
      setQuizComplete(true)
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setShown(false)
    }
  }

  const handleRetake = () => {
    setIndex(0)
    setSelected(null)
    setShown(false)
    setResponses([])
    setQuizComplete(false)
    try { sessionStorage.removeItem(QUIZ_STORAGE_KEY) } catch {}
  }

  useEffect(() => {
    const down = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (quizComplete && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault()
        handleRetake()
      }
      if (shown && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [quizComplete, shown, handleNext, handleRetake])

  const correctCount = responses.filter((r) => r.correct).length
  const totalCount = questions.length
  const scorePercent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0
  const incorrectResponses = responses.filter((r) => !r.correct)

  if (!topic) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-600 dark:text-slate-400">Quiz not found.</p>
        <Link to="/quiz" className="text-pc-blue font-medium mt-4 inline-block">← Back to quizzes</Link>
      </div>
    )
  }

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-600 overflow-hidden shadow-xl"
        >
          <div className="bg-gradient-to-r from-pc-blue/10 to-pc-purple/10 dark:from-pc-blue/20 dark:to-pc-purple/20 px-6 py-8 border-b border-slate-200 dark:border-slate-600">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Good job, pumpkin! 🌟</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-1">
              My precious little princess, I&apos;m so proud of you for learning all of this. You&apos;re amazing. 💕
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-1">
              You scored <strong className="text-pc-blue">{correctCount}</strong> / {totalCount} ({scorePercent}%) {scorePercent >= 80 ? "you're crushing it!" : scorePercent >= 60 ? "nice work, keep it up!" : "every attempt counts, you're learning!"}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">{topic.name}</p>
          </div>
          <div className="p-6 space-y-6">
            {incorrectResponses.length > 0 && (
              <div>
                <h2 className="font-bold text-slate-800 dark:text-white mb-3">Review incorrect answers</h2>
                <div className="space-y-3">
                  {incorrectResponses.map((r, i) => (
                    <div key={i} className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
                      <p className="text-slate-700 dark:text-slate-300">{r.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={handleRetake}
                className="px-6 py-3 bg-pc-blue text-white font-medium rounded-xl hover:bg-pc-purple transition-colors shadow-lg shadow-pc-blue/20"
              >
                Retake quiz
              </button>
              <span className="text-xs text-slate-500">or press R</span>
              <Link
                to="/quiz"
                className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors inline-block"
              >
                All quizzes
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 text-pc-blue font-medium hover:underline inline-block"
              >
                View progress →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/quiz" className="text-pc-blue font-medium mb-6 inline-block hover:underline">← All quizzes</Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{topic.icon}</span>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{topic.name}</h1>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${((index + (shown ? 1 : 0)) / totalCount) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-full bg-gradient-to-r from-pc-blue to-pc-purple rounded-full"
          />
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Question {index + 1} of {totalCount}</p>
      </div>

      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-600 overflow-hidden shadow-xl"
      >
        <div className="p-6 sm:p-8">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium mb-4 capitalize">
            {question.type.replace('_', ' ')}
          </span>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((opt) => {
              const wasSelected = selected === opt.id
              const showCorrect = shown && opt.correct
              const showWrong = shown && wasSelected && !opt.correct
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={shown}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl border-2 transition-all
                    ${showCorrect ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : ''}
                    ${showWrong ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''}
                    ${!shown ? 'border-slate-200 dark:border-slate-600 hover:border-pc-blue hover:bg-pc-blue/5 dark:hover:bg-pc-blue/10' : ''}
                    ${shown && !wasSelected && !opt.correct ? 'opacity-50' : ''}
                  `}
                >
                  <span className={showCorrect ? 'text-emerald-700 dark:text-emerald-300' : showWrong ? 'text-red-700 dark:text-red-300' : 'text-slate-700 dark:text-slate-300'}>
                    {opt.text}
                  </span>
                  {showCorrect && <span className="ml-2 text-emerald-600 font-medium">✓ Good girl!</span>}
                  {showWrong && <span className="ml-2 text-red-600 font-medium">✗ Incorrect</span>}
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {shown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
              >
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Explanation</h3>
                <p className="text-slate-700 dark:text-slate-300">{question.explanation}</p>
                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-pc-blue text-white font-medium rounded-xl hover:bg-pc-purple transition-colors"
                  >
                    {index + 1 >= questions.length ? 'See results' : 'Next question →'}
                  </button>
                  <span className="text-xs text-slate-500">or press N</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
