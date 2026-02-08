/**
 * Search modal - Cmd/Ctrl+K to open, full-text search
 */

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { search } from '../../data/searchIndex'

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    setResults(search(query))
    setSelected(0)
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'Escape') onClose(false)
      if (!open) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => Math.min(s + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => Math.max(s - 1, 0))
      }
      if (e.key === 'Enter' && results[selected]) {
        e.preventDefault()
        navigate(results[selected].path)
        onClose(false)
      }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [open, results, selected, onClose, navigate])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] p-4 bg-black/50" onClick={() => onClose(false)}>
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-xl w-full overflow-hidden border border-slate-200 dark:border-slate-600"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-600">
          <span className="text-slate-400">⌘K</span>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search parts, terms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 outline-none"
          />
        </div>
        <div className="max-h-64 overflow-y-auto">
          {results.map((r, i) => (
            <button
              key={`${r.type}-${r.id}`}
              onClick={() => {
                navigate(r.path)
                onClose(false)
              }}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                i === selected ? 'bg-pc-blue/10 dark:bg-pc-blue/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <span className="text-xs font-medium text-pc-blue uppercase">{r.type}</span>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{r.title}</p>
                {r.subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{r.subtitle}</p>}
              </div>
            </button>
          ))}
          {results.length === 0 && query.trim() && (
            <p className="px-4 py-6 text-slate-500 dark:text-slate-400 text-center">No results</p>
          )}
        </div>
      </div>
    </div>
  )
}
