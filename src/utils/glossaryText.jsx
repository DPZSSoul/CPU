/**
 * Renders text with glossary terms as clickable spans (tooltip)
 */

import { useState } from 'react'
import { GLOSSARY_TERMS } from '../data/glossary'

const TERM_PATTERNS = Object.entries(GLOSSARY_TERMS)
  .map(([id, { term }]) => ({ id, term, pattern: new RegExp(`\\b(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi') }))
  .sort((a, b) => b.term.length - a.term.length) // Longest first

function TermTooltip({ id, term, definition, children }) {
  const [show, setShow] = useState(false)
  return (
    <span
      className="relative inline group/term"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span
        className="cursor-help border-b border-dotted border-pc-accent/60 text-pc-accent hover:border-pc-accent"
        tabIndex={0}
      >
        {children}
      </span>
      {show && (
        <span className="absolute left-0 bottom-full z-50 mb-1 px-3 py-2 max-w-xs rounded-lg bg-slate-800 text-white text-sm shadow-xl border border-slate-600 pointer-events-none">
          <strong>{term}</strong>: {definition}
        </span>
      )}
    </span>
  )
}

export function GlossaryText({ text, className = '' }) {
  if (!text) return null

  const parts = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    let found = false
    for (const { id, term, pattern } of TERM_PATTERNS) {
      const match = remaining.match(pattern)
      if (match) {
        const idx = remaining.toLowerCase().indexOf(term.toLowerCase())
        if (idx >= 0) {
          const before = remaining.slice(0, idx)
          const matched = remaining.slice(idx, idx + term.length)
          const def = GLOSSARY_TERMS[id]
          if (before) parts.push(<span key={key++}>{before}</span>)
          parts.push(
            <TermTooltip key={key++} id={id} term={def.term} definition={def.definition}>
              {matched}
            </TermTooltip>
          )
          remaining = remaining.slice(idx + term.length)
          found = true
          break
        }
      }
    }
    if (!found) {
      parts.push(<span key={key++}>{remaining}</span>)
      break
    }
  }

  return <span className={className}>{parts}</span>
}
