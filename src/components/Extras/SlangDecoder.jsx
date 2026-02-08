import { useState } from 'react'
import { motion } from 'framer-motion'
import { SLANG } from '../../data/slang'

export default function SlangDecoder() {
  const [filter, setFilter] = useState('')

  const filtered = SLANG.filter(
    (s) =>
      s.term.toLowerCase().includes(filter.toLowerCase()) ||
      s.plain.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Slang Decoder</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">PC community terms explained in plain English.</p>

      <input
        type="text"
        placeholder="Search terms..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 mb-6"
      />

      <div className="space-y-4">
        {filtered.map((s, i) => (
          <motion.div
            key={s.term}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600"
          >
            <span className="font-bold text-pc-blue">{s.term}</span>
            <p className="mt-2 text-slate-700 dark:text-slate-300">{s.plain}</p>
            <p className="mt-2 text-sm text-slate-500 italic">{s.example}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
