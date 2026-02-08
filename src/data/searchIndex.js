/**
 * Search index - full-text search across Learn content
 * Used for Cmd/Ctrl+K search
 */

import { DEEP_PARTS } from './deepLearning'
import { GLOSSARY_ENTRIES } from './glossary'

function flattenPart(part) {
  const text = [
    part.name,
    part.subtitle,
    part.description,
    ...(part.sections?.flatMap((s) => [s.title, s.content, s.learnMore]) || []),
    ...(part.commonProblems?.map((p) => `${p.issue} ${p.fix}`) || []),
    ...(part.symptomsWhenFails || []),
    ...(part.beginnerMistakes || []),
  ]
  return text.filter(Boolean).join(' ').toLowerCase()
}

export const SEARCH_INDEX = [
  ...Object.values(DEEP_PARTS).map((part) => ({
    id: part.id,
    type: 'part',
    title: part.name,
    subtitle: part.subtitle,
    path: `/learn/${part.id}`,
    text: flattenPart(part),
  })),
  ...GLOSSARY_ENTRIES.map((entry) => ({
    id: entry.id,
    type: 'glossary',
    title: entry.term,
    subtitle: entry.definition?.slice(0, 60) + '…',
    path: '/resources',
    text: `${entry.term} ${entry.definition}`.toLowerCase(),
  })),
]

export function search(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const words = q.split(/\s+/).filter(Boolean)
  return SEARCH_INDEX.filter((item) => {
    const score = words.reduce((s, w) => (item.text.includes(w) ? s + 1 : 0), 0)
    return score === words.length
  }).slice(0, 10)
}
