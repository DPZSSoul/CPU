/**
 * Final Tasks - end-to-end PC build mastery
 */

import { Link } from 'react-router-dom'

export default function FinalTasksPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Final Tasks</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Prove you can build a PC from start to finish. Coming soon.
      </p>
      <Link to="/quiz" className="text-pc-blue font-medium hover:underline">Back to Quiz</Link>
    </div>
  )
}
