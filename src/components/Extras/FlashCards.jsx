import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FLASH_CARDS } from '../../data/flashCards'

export default function FlashCards() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = FLASH_CARDS[index]

  const next = () => {
    setFlipped(false)
    setIndex((i) => (i + 1) % FLASH_CARDS.length)
  }
  const prev = () => {
    setFlipped(false)
    setIndex((i) => (i - 1 + FLASH_CARDS.length) % FLASH_CARDS.length)
  }

  useEffect(() => {
    const down = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'n' || e.key === 'N') { e.preventDefault(); next() }
      if (e.key === 'p' || e.key === 'P') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Terminology Flash Cards</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Click to flip. Learn the terms.</p>

      <motion.div
        onClick={() => setFlipped(!flipped)}
        className="min-h-[200px] p-8 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 shadow-card cursor-pointer hover:border-pc-blue/50 transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-center">
          {!flipped ? (
            <p className="text-2xl font-bold text-pc-blue">{card.term}</p>
          ) : (
            <p className="text-slate-700 dark:text-slate-300">{card.def}</p>
          )}
        </div>
      </motion.div>

      <div className="mt-6 flex justify-between items-center">
        <button onClick={prev} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 font-medium">
          ← Prev
        </button>
        <span className="text-sm text-slate-500">{index + 1} / {FLASH_CARDS.length}</span>
        <button onClick={next} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 font-medium">
          Next →
        </button>
      </div>
    </div>
  )
}
