/**
 * Professional Build - build with constraints (budget, use-case, compatibility)
 * System reacts: wrong PSU → instability, wrong RAM → won't boot, etc.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  USE_CASES,
  BUDGET_TIERS,
  PARTS_CATALOG,
  SHOPPING_LINKS,
  validateBuild,
} from '../../data/buildConstraints'
import PartImage from '../PartImage'

const CATEGORY_LABELS = {
  cpu: 'CPU',
  motherboard: 'Motherboard',
  ram: 'RAM',
  gpu: 'GPU',
  psu: 'Power Supply',
  storage: 'Storage',
}

export default function ProfessionalBuild() {
  const [useCase, setUseCase] = useState(null)
  const [budget, setBudget] = useState(null)
  const [selections, setSelections] = useState({})
  const [validated, setValidated] = useState(null)

  const handleSelectPart = (category, part) => {
    setSelections((prev) => ({
      ...prev,
      [category]: part,
    }))
    setValidated(null)
  }

  const handleValidate = () => {
    setValidated(validateBuild(selections))
  }

  const totalPrice = Object.values(selections).reduce((s, p) => s + (p?.price || 0), 0)
  const overBudget = budget && totalPrice > budget.max

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          PC Builder
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl">
          Choose compatible parts for your build. Avoid bottlenecks, power issues, and thermal problems. 
          Prices are approximate, check PCPartPicker for live pricing.
        </p>
      </div>

      {/* Use case */}
      <section className="mb-10">
        <h2 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">1. Use case</h2>
        <div className="flex flex-wrap gap-2">
          {USE_CASES.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setUseCase(uc)}
              className={`px-4 py-2.5 rounded-xl border-2 transition-all font-medium ${
                useCase?.id === uc.id
                  ? 'border-pc-blue bg-pc-blue/15 dark:bg-pc-blue/20 text-slate-900 dark:text-white'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-pc-blue/50 hover:bg-pc-blue/5 dark:hover:bg-pc-blue/10'
              }`}
            >
              {uc.name}
            </button>
          ))}
        </div>
      </section>

      {/* Budget */}
      <section className="mb-10">
        <h2 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">2. Budget</h2>
        <div className="flex flex-wrap gap-2">
          {BUDGET_TIERS.map((b) => (
            <button
              key={b.id}
              onClick={() => setBudget(b)}
              className={`px-4 py-2.5 rounded-xl border-2 transition-all font-medium ${
                budget?.id === b.id
                  ? 'border-pc-blue bg-pc-blue/15 dark:bg-pc-blue/20 text-slate-900 dark:text-white'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-pc-blue/50 hover:bg-pc-blue/5 dark:hover:bg-pc-blue/10'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </section>

      {/* Part selection */}
      <section className="mb-10">
        <h2 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">3. Parts</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(PARTS_CATALOG).map(([category, parts]) => (
            <div
              key={category}
              className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-600 overflow-hidden shadow-lg shadow-slate-900/5"
            >
              <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/30">
                <PartImage partId={category} size="sm" />
                <h3 className="font-semibold text-slate-900 dark:text-white capitalize">
                  {CATEGORY_LABELS[category] || category}
                </h3>
              </div>
              <div className="p-4 pt-0">
                <div className="space-y-2">
                  {parts.map((part) => (
                    <button
                      key={part.id}
                      onClick={() => handleSelectPart(category, part)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                        selections[category]?.id === part.id
                          ? 'border-pc-blue bg-pc-blue/15 dark:bg-pc-blue/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      <span className="font-medium text-slate-900 dark:text-white">{part.name}</span>
                      <span className="text-pc-accent font-semibold">${part.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary + validate */}
      <section className="mb-10">
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            Total: <span className="text-pc-accent">${totalPrice}</span>
            {overBudget && (
              <span className="text-red-500 dark:text-red-400 ml-2 font-normal">(Over budget!)</span>
            )}
          </p>
          <button
            onClick={handleValidate}
            className="px-6 py-3 bg-pc-accent text-white font-semibold rounded-xl hover:bg-pc-accent-dark transition-colors shadow-lg"
          >
            Validate build
          </button>
        </div>
      </section>

      {/* Validation result */}
      {validated && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 border-2 ${
            validated.valid
              ? 'border-emerald-500/50 dark:border-emerald-500/50 bg-emerald-50 dark:bg-emerald-900/20'
              : 'border-amber-400/60 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-900/20'
          }`}
        >
          {validated.valid ? (
            <p className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">
              ✓ Build looks good! Parts are compatible. Head to PCPartPicker to compare prices and finish your list.
            </p>
          ) : (
            <>
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2 text-lg">Issues found</h3>
              <ul className="list-disc list-inside text-slate-800 dark:text-slate-200 space-y-1">
                {validated.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      )}

      {/* Where to buy */}
      <section className="mt-14 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600">
        <h2 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Where to buy parts</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Compare prices across retailers. PCPartPicker tracks live prices and checks compatibility automatically.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHOPPING_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-pc-blue/50 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{link.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{link.desc}</p>
              <span className="text-xs text-pc-accent font-medium mt-2 inline-block">→ Open</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
