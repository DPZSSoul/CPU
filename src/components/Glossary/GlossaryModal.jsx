/**
 * Glossary - modal with term lookup
 */

import { useState, useEffect } from 'react'
import { GLOSSARY_ENTRIES } from '../../data/glossary'

export default function GlossaryModal({ open, onClose }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const down = (e) => { if (e.key === 'Escape') onClose() }
    if (open) {
      window.addEventListener('keydown', down)
      return () => window.removeEventListener('keydown', down)
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) setQuery('')
  }, [open])

  const filtered = query.trim()
    ? GLOSSARY_ENTRIES.filter(
        (e) =>
          e.term.toLowerCase().includes(query.toLowerCase()) ||
          e.definition.toLowerCase().includes(query.toLowerCase())
      )
    : GLOSSARY_ENTRIES

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-600">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Glossary</h2>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <input
            type="search"
            placeholder="Search terms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
            autoFocus
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600"
            >
              <dt className="font-semibold text-slate-900 dark:text-white">{entry.term}</dt>
              <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">{entry.definition}</dd>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">No terms found</p>
          )}
        </div>
      </div>
    </div>
  )
}
