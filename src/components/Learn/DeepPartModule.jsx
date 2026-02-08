/**
 * Deep Part Module - scrollable sections with "Learn more" per topic
 * Table of contents, inline glossary, analogies, mistake callouts, knowledge check
 */

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DEEP_PARTS } from '../../data/deepLearning'
import { useProgress } from '../../context/ProgressContext'
import { fireConfetti } from '../../utils/confetti'
import { GlossaryText } from '../../utils/glossaryText'
import PartImage from '../PartImage'
import PartCheatSheet from './PartCheatSheet'
import PartKnowledgeCheck from './PartKnowledgeCheck'

export default function DeepPartModule() {
  const { partId } = useParams()
  const part = partId ? DEEP_PARTS[partId] : null
  const { completeModule, isModuleComplete } = useProgress()
  const [confidence, setConfidence] = useState(null)

  if (!part) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-600 dark:text-slate-400">Part not found.</p>
        <Link to="/learn" className="text-pc-accent font-medium mt-4 inline-block">← Back to Learn</Link>
      </div>
    )
  }

  const sections = part.sections || []

  return (
    <div className="py-4">
      <div className="hidden print:block">
        <PartCheatSheet part={part} />
      </div>

      <div className="print:hidden">
        <Link to="/learn" className="text-pc-accent font-medium mb-6 inline-block">← All parts</Link>

        <div className="flex flex-col sm:flex-row gap-6 mb-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-card">
          <PartImage partId={part.id} size="xl" className="flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{part.name}</h1>
            {part.subtitle && (
              <p className="text-slate-500 dark:text-slate-400">{part.subtitle}</p>
            )}
            <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <GlossaryText text={part.description} />
            </p>
          </div>
        </div>

        {/* Table of contents */}
        {sections.length > 1 && (
          <nav className="mb-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">In this guide:</p>
            <ul className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#section-${s.id}`}
                    className="text-sm text-pc-accent hover:underline px-2 py-1 rounded hover:bg-pc-accent/10"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            💡 Hover over <span className="border-b border-dotted border-pc-accent">glossary terms</span> for definitions. Click <strong>Learn more</strong> for deeper detail. Stuck? Use <strong>Ask AI</strong> or <strong>I&apos;m stuck</strong>.
          </p>
          <p className="mt-2 text-sm text-rose-600 dark:text-rose-400 italic">Good girl. Proud of you for learning this. You&apos;re doing amazing. 💕</p>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.article
              key={section.id}
              id={`section-${section.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="scroll-mt-24 border border-slate-200 dark:border-slate-600 rounded-2xl overflow-hidden shadow-card"
            >
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
                <h2 className="font-semibold text-slate-900 dark:text-white text-lg">{section.title}</h2>
              </div>
              <div className="p-6 bg-white dark:bg-slate-800">
                {section.analogy && (
                  <div className="mb-4 p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-700/50">
                    <p className="text-sm font-medium text-sky-800 dark:text-sky-200 mb-1">Think of it like…</p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">{section.analogy}</p>
                  </div>
                )}
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <GlossaryText text={section.content} />
                </p>
                {section.mistakeWarning && (
                  <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700/50">
                    <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">{section.mistakeWarning}</p>
                  </div>
                )}
                {section.learnMore && (
                  <details className="mt-4 group">
                    <summary className="cursor-pointer text-pc-accent font-medium hover:underline list-none flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
                      Learn more
                    </summary>
                    <div className="mt-3 pl-5 border-l-2 border-pc-accent/30">
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        <GlossaryText text={section.learnMore} />
                      </p>
                    </div>
                  </details>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Knowledge check */}
        <PartKnowledgeCheck partId={part.id} />

        {/* Confidence check */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">How confident do you feel about this part?</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setConfidence(n)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  confidence === n
                    ? 'bg-pc-accent text-white'
                    : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-pc-accent/50'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">1 = need more practice · 5 = ready to move on</p>
        </div>

        {/* Mark as complete + Print */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600 flex flex-wrap gap-3 items-center">
          {isModuleComplete(part.id) ? (
            <p className="text-pc-teal font-medium">Good job, pumpkin! ✓ Completed 🌟 Your daddy&apos;s good girl. I&apos;m so proud of you for sticking with it. Love you always. 💕</p>
          ) : (
            <button
              onClick={() => {
                completeModule(part.id)
                fireConfetti()
              }}
              className="px-6 py-3 bg-pc-accent text-white font-medium rounded-lg hover:bg-pc-accent-dark transition-colors"
            >
              Mark as complete
            </button>
          )}
          <button
            onClick={() => window.print()}
            className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Print cheat sheet
          </button>
        </div>
      </div>
    </div>
  )
}
