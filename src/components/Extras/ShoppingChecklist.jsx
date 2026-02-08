import { useState } from 'react'
import { motion } from 'framer-motion'
import { SHOPPING_CHECKLIST } from '../../data/toolsAndChecklists'

export default function ShoppingChecklist() {
  const [checked, setChecked] = useState({})

  const toggle = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }))

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Before You Buy</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Checklist to verify compatibility before purchasing. Check each off as you confirm.
      </p>

      <div className="space-y-3">
        {SHOPPING_CHECKLIST.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggle(i)}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-colors ${
              checked[i]
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-pc-blue/50'
            }`}
          >
            <span className="text-2xl">{checked[i] ? '✓' : '○'}</span>
            <span className={checked[i] ? 'line-through text-slate-500' : 'text-slate-800 dark:text-slate-200'}>
              {item}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Use PCPartPicker to check compatibility automatically. This list is a manual double-check.
      </p>
    </div>
  )
}
