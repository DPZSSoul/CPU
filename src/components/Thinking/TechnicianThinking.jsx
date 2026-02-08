/**
 * Technician Thinking - how to think, not just what to know
 * Flowcharts, elimination method, cause vs symptom
 */

import { motion } from 'framer-motion'

const FLOWCHART_PC_WONT_ON = [
  { id: 1, text: 'PC won\'t turn on?', type: 'start' },
  { id: 2, text: 'Is power cable plugged in?', type: 'decision' },
  { id: 3, text: 'Is PSU switch ON?', type: 'decision' },
  { id: 4, text: 'Try wall outlet / surge protector', type: 'action' },
  { id: 5, text: 'Check front panel connector (PWR_SW)', type: 'action' },
  { id: 6, text: 'Paperclip test PSU', type: 'action' },
  { id: 7, text: 'Replace PSU if dead', type: 'end' },
]

const FLOWCHART_NO_DISPLAY = [
  { id: 1, text: 'PC on, no display?', type: 'start' },
  { id: 2, text: 'Monitor in GPU port (not motherboard)?', type: 'decision' },
  { id: 3, text: 'Try integrated graphics', type: 'action' },
  { id: 4, text: 'Reseat RAM', type: 'action' },
  { id: 5, text: 'Reseat GPU', type: 'action' },
  { id: 6, text: 'Test with known-good GPU', type: 'action' },
]

const PRINCIPLES = [
  {
    title: 'Check easiest thing first',
    body: 'Power cable and connections before replacing parts. Monitor cable port before assuming dead GPU.',
  },
  {
    title: 'Elimination method',
    body: 'One variable at a time. Swap RAM sticks, try one stick, try different slot. Isolate the fault.',
  },
  {
    title: 'Cause vs symptom',
    body: 'Black screen is a symptom. The cause could be cable, RAM, CPU, GPU, or motherboard. Don\'t assume.',
  },
  {
    title: 'No punishment , learn',
    body: 'Wrong diagnosis? Understand why. Real techs make mistakes. The goal is learning the logic.',
  },
]

const MYTHS = [
  { myth: 'Black screen = dead GPU', truth: 'Could be wrong port, RAM, CPU, or board. Eliminate.' },
  { myth: 'Slow PC = need new CPU', truth: 'Often RAM, storage (HDD vs SSD), or thermal throttling.' },
  { myth: 'More cores = always faster', truth: 'Single-thread matters for games. Check benchmarks.' },
]

export default function TechnicianThinking() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Technician Thinking</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Learn how to think,not just what to know. Flowcharts, principles, and myths to avoid.
        </p>
      </div>

      {/* Principles */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Core Principles</h2>
        <div className="space-y-4">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-6"
            >
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">{p.title}</h3>
              <p className="text-slate-700 dark:text-slate-300">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Myths */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Myths to Avoid</h2>
        <div className="space-y-3">
          {MYTHS.map((m, i) => (
            <div key={i} className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700/50 p-4">
              <p className="text-slate-600 dark:text-slate-400"><span className="text-amber-700 dark:text-amber-400 font-medium">Myth:</span> {m.myth}</p>
              <p className="text-slate-700 dark:text-slate-300 mt-1"><span className="text-emerald-600 dark:text-emerald-400 font-medium">Truth:</span> {m.truth}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flowcharts */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Troubleshooting Flowcharts</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Logical steps to follow. Order matters,check easy/cheap things first.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">PC Won\'t Turn On</h3>
            <div className="flex flex-col gap-2">
              {FLOWCHART_PC_WONT_ON.map((step, i) => (
                <div
                  key={step.id}
                  className={`
                    px-4 py-3 rounded-lg border-2
                    ${step.type === 'start' ? 'border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
                    ${step.type === 'decision' ? 'border-amber-500 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/20' : ''}
                    ${step.type === 'action' ? 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800' : ''}
                    ${step.type === 'end' ? 'border-emerald-500 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : ''}
                  `}
                >
                  <span className="text-slate-800 dark:text-slate-200">{step.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">PC On, No Display</h3>
            <div className="flex flex-col gap-2">
              {FLOWCHART_NO_DISPLAY.map((step) => (
                <div
                  key={step.id}
                  className={`
                    px-4 py-3 rounded-lg border-2
                    ${step.type === 'start' ? 'border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
                    ${step.type === 'decision' ? 'border-amber-500 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/20' : ''}
                    ${step.type === 'action' ? 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800' : ''}
                  `}
                >
                  <span className="text-slate-800 dark:text-slate-200">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
