/**
 * Sound toggle - refined design
 */

import { useState, useEffect } from 'react'
import { isMuted, setMuted } from '../utils/sounds'

export default function SoundToggle() {
  const [muted, setMutedState] = useState(isMuted())

  useEffect(() => {
    setMutedState(isMuted())
  }, [])

  const toggle = () => {
    const next = !muted
    setMuted(next)
    setMutedState(next)
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-blue"
      aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
      title={muted ? 'Sounds off' : 'Sounds on'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 transition-colors ${muted ? 'text-slate-400 opacity-60' : 'text-slate-600 dark:text-slate-300'}`}>
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.64c-1.11 0-2.014.895-2.014 2.017v4.986c0 1.122.904 2.017 2.014 2.017h2.18l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
      </svg>
    </button>
  )
}
