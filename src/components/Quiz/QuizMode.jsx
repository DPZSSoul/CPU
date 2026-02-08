/**
 * Quiz Mode - knowledge checks with scores, review, progress tracking
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QUIZ_QUESTIONS } from '../../data/quizzes'
import { playSuccess, playWrong } from '../../utils/sounds'
import { useProgress } from '../../context/ProgressContext'

export default function QuizMode() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [shown, setShown] = useState(false)
  const [responses, setResponses] = useState([])
  const [quizComplete, setQuizComplete] = useState(false)
  const { recordQuiz } = useProgress()

  const question = QUIZ_QUESTIONS[index]
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
    if (index + 1 >= QUIZ_QUESTIONS.length) {
      const correct = responses.filter((r) => r.correct).length
      const total = QUIZ_QUESTIONS.length
      recordQuiz('general', correct, total)
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
  }

  const correctCount = responses.filter((r) => r.correct).length
  const totalCount = QUIZ_QUESTIONS.length
  const scorePercent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0
  const incorrectResponses = responses.filter((r) => !r.correct)

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-600 overflow-hidden"
        >
          <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-6 border-b border-slate-200 dark:border-slate-600">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Quiz complete</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Score: <strong>{correctCount}</strong> / {totalCount} ({scorePercent}%)
            </p>
          </div>
          <div className="p-6 space-y-6">
            {incorrectResponses.length > 0 && (
              <div>
                <h2 className="font-bold text-slate-800 dark:text-white mb-3">Review incorrect answers</h2>
                <div className="space-y-3">
                  {incorrectResponses.map((r, i) => (
                    <div key={i} className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
                      <p className="text-slate-700 dark:text-slate-300">{r.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={handleRetake}
                className="px-6 py-3 bg-pc-blue text-white font-medium rounded-lg hover:bg-pc-purple transition-colors"
              >
                Retake quiz
              </button>
              <a
                href="/dashboard"
                className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                View progress
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Knowledge Check</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Test your understanding. Explanations appear after each answer. Progress is saved.
        </p>
        <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${((index + (shown ? 1 : 0)) / totalCount) * 100}%` }}
            className="h-full bg-pc-blue rounded-full"
          />
        </div>
      </div>

      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-600 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex gap-2 mb-4">
            <span className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 capitalize">
              {question.type.replace('_', ' ')}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-6">{question.question}</h2>

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
                    w-full text-left px-4 py-3 rounded-lg border-2 transition-colors
                    ${showCorrect ? 'border-pc-mint bg-pc-mint/20' : ''}
                    ${showWrong ? 'border-red-300 bg-red-50' : ''}
                    ${!shown ? 'border-slate-200 hover:border-pc-blue hover:bg-pc-blue/5' : ''}
                    ${shown && !wasSelected && !opt.correct ? 'opacity-60' : ''}
                  `}
                >
                  <span>{opt.text}</span>
                  {showCorrect && <span className="ml-2 text-pc-teal font-medium">✓ Correct</span>}
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
                className="mt-6 p-4 rounded-lg bg-slate-100 border border-slate-200"
              >
                <h3 className="font-semibold text-slate-800 mb-2">Explanation</h3>
                <p className="text-slate-700">{question.explanation}</p>
                <button
                  onClick={handleNext}
                  className="mt-4 px-4 py-2 bg-pc-blue text-white font-medium rounded-lg hover:bg-pc-purple transition-colors"
                >
                  {index + 1 >= QUIZ_QUESTIONS.length ? 'See results' : 'Next question →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <p className="text-center text-slate-500 text-sm mt-6">
        Question {index + 1} of {QUIZ_QUESTIONS.length}
      </p>
    </div>
  )
}
