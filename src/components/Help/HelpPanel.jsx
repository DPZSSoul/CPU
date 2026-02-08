/**
 * Contextual Help Panel - patient teacher-style explanations
 * Appears on every page. Explains current topic: simple, different angle, example
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getHelpForTopic } from '../../data/helpContent'

const PROMPTS = [
  { id: 'simple', label: "I don't understand this", icon: '💡' },
  { id: 'different', label: 'Explain this differently', icon: '🔄' },
  { id: 'example', label: 'Give me an example', icon: '📌' },
]

export default function HelpPanel({ topicId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activePrompt, setActivePrompt] = useState(null)

  const content = getHelpForTopic(topicId)
  const currentText = activePrompt && content[activePrompt]

  useEffect(() => {
    const down = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    if (isOpen) {
      window.addEventListener('keydown', down)
      return () => window.removeEventListener('keydown', down)
    }
  }, [isOpen])

  return (
    <>
      {/* Floating help button - left of I'm stuck */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-[9.25rem] z-40 w-11 h-11 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 shadow-md hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-500 hover:text-pc-accent transition-all flex items-center justify-center no-print focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-accent focus-visible:ring-offset-2"
        aria-label="Get help with this topic"
        title="Help with this topic"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="fixed bottom-20 right-6 z-50 w-full max-w-md bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-600 flex items-center justify-between bg-slate-50/50 dark:bg-slate-700/30">
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Help with this topic</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Choose how you&apos;d like me to explain:
              </p>
              <div className="space-y-2">
                {PROMPTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePrompt(activePrompt === p.id ? null : p.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center gap-3 text-sm font-medium ${
                      activePrompt === p.id
                        ? 'border-pc-accent bg-pc-accent/10 dark:bg-pc-accent/20 text-pc-accent'
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {currentText && (
                  <motion.div
                    key={activePrompt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                  >
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{currentText}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
