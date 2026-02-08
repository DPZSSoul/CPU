/**
 * Learn layout - parts list + deep module content
 */

import { Link } from 'react-router-dom'
import { DEEP_PART_IDS, DEEP_PARTS } from '../../data/deepLearning'
import { useProgress } from '../../context/ProgressContext'
import PartImage from '../PartImage'

export default function LearnLayout({ children }) {
  const { toggleBookmark, isBookmarked } = useProgress()
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar - part links */}
      <aside className="lg:w-56 flex-shrink-0">
        <nav className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-card p-4">
          <h2 className="font-bold text-slate-800 dark:text-white mb-3">Parts</h2>
          <ul className="space-y-1">
            {DEEP_PART_IDS.map((id) => (
              <li key={id} className="flex items-center gap-1">
                <Link
                  to={`/learn/${id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded text-slate-600 dark:text-slate-400 hover:bg-pc-accent/10 hover:text-pc-accent transition-colors flex-1"
                >
                  <PartImage partId={id} size="sm" />
                  <span className="font-medium">{DEEP_PARTS[id]?.name}</span>
                </Link>
                <button
                  onClick={(e) => { e.preventDefault(); toggleBookmark(`learn-${id}`) }}
                  className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                  title={isBookmarked(`learn-${id}`) ? 'Remove bookmark' : 'Bookmark'}
                  aria-label="Bookmark"
                >
                  {isBookmarked(`learn-${id}`) ? '★' : '☆'}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
