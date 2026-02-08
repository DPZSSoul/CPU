/**
 * Part Cheat Sheet - one-page printable reference per part
 */

import PartImage from '../PartImage'

export default function PartCheatSheet({ part }) {
  if (!part) return null

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-6 print:p-4 print:border print:shadow-none">
      <div className="flex items-center gap-4 mb-6 print:mb-4">
        <PartImage partId={part.id} size="xl" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{part.name}</h1>
          {part.subtitle && <p className="text-slate-500 dark:text-slate-400">{part.subtitle}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 print:gap-4 print:text-sm">
        <section>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">What it does</h3>
          <p className="text-slate-600 dark:text-slate-300">
            {part.whatItDoes?.simple || (part.description && part.description.length > 120 ? part.description.slice(0, 120) + '...' : part.description) || ''}
          </p>
        </section>
        <section>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Common problems</h3>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300">
            {part.commonProblems?.slice(0, 4).map((p, i) => (
              <li key={i}>• {p.issue}: {p.fix}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Symptoms when it fails</h3>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300">
            {part.symptomsWhenFails?.slice(0, 5).map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Beginner mistakes</h3>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300">
            {part.beginnerMistakes?.slice(0, 4).map((m, i) => (
              <li key={i}>• {m}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
