/**
 * One-page printable build day cheat sheet
 */

import { CAPSTONE_TASKS } from '../../data/capstoneTasks'

export default function BuildDayCheatSheet() {
  return (
    <div className="bg-white text-slate-900 p-6 rounded-2xl border-2 border-slate-200 print:p-4 print:border">
      <h1 className="text-2xl font-bold mb-4">Build Day Cheat Sheet</h1>
      <p className="text-sm text-slate-600 mb-6">Print this and keep it handy. Check off as you go.</p>

      <div className="space-y-6">
        {CAPSTONE_TASKS.map((phase) => (
          <section key={phase.id}>
            <h2 className="font-bold text-lg mb-2">{phase.phase}</h2>
            <ul className="space-y-1">
              {phase.tasks.map((t) => (
                <li key={t.id} className="flex items-start gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-slate-400 rounded flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t.text}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-amber-100 border border-amber-300">
        <h3 className="font-bold mb-2">⚠️ Don&apos;t forget</h3>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Remove plastic from CPU cooler</li>
          <li>Use standoffs under motherboard</li>
          <li>Plug monitor into GPU (not motherboard)</li>
          <li>Connect 8 pin CPU power</li>
          <li>Never mix modular PSU cables</li>
        </ul>
      </div>

      <p className="mt-6 text-xs text-slate-500">PC Learning Platform. Build Day Cheat Sheet</p>
    </div>
  )
}
