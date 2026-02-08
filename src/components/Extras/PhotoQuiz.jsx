import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PHOTO_QUIZ_ITEMS, PART_NAMES } from '../../data/photoQuiz'

export default function PhotoQuiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)

  const item = PHOTO_QUIZ_ITEMS[index]
  const options = [item.correctAnswer, ...item.wrongAnswers].sort(() => Math.random() - 0.5)

  const handleAnswer = (ans) => {
    if (selected) return
    setSelected(ans)
    if (ans === item.correctAnswer) setScore((s) => s + 1)
  }

  const next = () => {
    setSelected(null)
    setIndex((i) => (i + 1) % PHOTO_QUIZ_ITEMS.length)
  }

  useEffect(() => {
    const down = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (selected && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [selected])

  const getLabel = (id) => PART_NAMES[id]?.name || id

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Photo Quiz</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Which part is this?</p>

      <div className="text-sm text-slate-500 mb-4">Score: {score} correct</div>

      <div className="overflow-hidden rounded-2xl">
        <img
          src={item.image}
          alt=""
          className="w-full h-48 object-cover bg-slate-200 dark:bg-slate-700"
          onError={(e) => { e.target.src = `/images/parts/${item.id}.svg` }}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            disabled={!!selected}
            className={`p-4 rounded-xl font-medium transition-colors ${
              selected
                ? opt === item.correctAnswer
                  ? 'bg-emerald-500 text-white'
                  : opt === selected
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-pc-blue'
            }`}
          >
            {getLabel(opt)}
          </button>
        ))}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50"
        >
          <p className="font-medium">
            {selected === item.correctAnswer ? 'Good job, pumpkin! Correct! 🌟' : `It's ${getLabel(item.correctAnswer)}. Keep going, you've got this!`}
          </p>
          <button onClick={next} className="mt-3 px-4 py-2 bg-pc-blue text-white rounded-lg font-medium">
            Next →
          </button>
        </motion.div>
      )}
    </div>
  )
}
