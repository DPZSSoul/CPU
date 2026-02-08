/**
 * Diagnose Simulator - case-file style troubleshooting
 * Immersive, professional UX with reveal flow
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SCENARIOS, SCENARIO_CATEGORIES, BEGINNER_SCENARIO_IDS } from '../../data/scenarios'
import { playSuccess, playWrong } from '../../utils/sounds'
import { fireConfetti } from '../../utils/confetti'
import { useProgress } from '../../context/ProgressContext'

const CATEGORY_STYLES = {
  power: 'bg-amber-500/20 border-amber-400/50 text-amber-800 dark:text-amber-300',
  boot: 'bg-blue-500/20 border-blue-400/50 text-blue-800 dark:text-blue-300',
  performance: 'bg-violet-500/20 border-violet-400/50 text-violet-800 dark:text-violet-300',
  thermal: 'bg-rose-500/20 border-rose-400/50 text-rose-800 dark:text-rose-300',
  compatibility: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-800 dark:text-emerald-300',
  'user-error': 'bg-slate-500/20 border-slate-400/50 text-slate-800 dark:text-slate-300',
}

export default function DiagnoseSimulator() {
  const { recordDiagnosisAttempt, recordDiagnosisSuccess } = useProgress()
  const [mode, setMode] = useState('beginner') // beginner | pro
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [step, setStep] = useState('intro') // intro | investigate | diagnose | result
  const [selectedChecks, setSelectedChecks] = useState([])
  const [revealedCauses, setRevealedCauses] = useState([])
  const [selectedCause, setSelectedCause] = useState(null)
  const [result, setResult] = useState(null)

  const visibleScenarios = mode === 'beginner'
    ? SCENARIOS.filter((s) => BEGINNER_SCENARIO_IDS.includes(s.id))
    : SCENARIOS
  const scenario = visibleScenarios[scenarioIndex]
  const categoryLabel = SCENARIO_CATEGORIES[scenario?.category] || scenario?.category
  const categoryStyle = CATEGORY_STYLES[scenario?.category] || CATEGORY_STYLES['user-error']

  const handlePerformCheck = (checkId) => {
    if (selectedChecks.includes(checkId)) return
    const check = scenario.checks.find((c) => c.id === checkId)
    setSelectedChecks((prev) => [...prev, checkId])
    if (check?.reveals) {
      setRevealedCauses((prev) => [...new Set([...prev, ...check.reveals])])
    }
  }

  const handleSelectCause = (causeId) => {
    setSelectedCause(causeId)
    recordDiagnosisAttempt()
    if (causeId === scenario.rootCause) {
      setResult('correct')
      recordDiagnosisSuccess()
      playSuccess()
      fireConfetti()
    } else {
      setResult('wrong')
      playWrong()
    }
  }

  const handleNextScenario = useCallback(() => {
    setScenarioIndex((i) => {
      const list = mode === 'beginner'
        ? SCENARIOS.filter((s) => BEGINNER_SCENARIO_IDS.includes(s.id))
        : SCENARIOS
      return (i + 1) % list.length
    })
    setStep('intro')
    setSelectedChecks([])
    setRevealedCauses([])
    setSelectedCause(null)
    setResult(null)
  }, [mode])

  const handleStart = () => setStep('investigate')

  const correctCause = scenario.possibleCauses.find((c) => c.id === scenario.rootCause)

  useEffect(() => {
    const down = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (result && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault()
        handleNextScenario()
      }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [result, handleNextScenario])

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
            Diagnosis Simulator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-4">
            Work through real troubleshooting scenarios. Perform checks, gather clues, then diagnose.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setMode('beginner'); setScenarioIndex(0); setStep('intro'); setSelectedChecks([]); setRevealedCauses([]); setSelectedCause(null); setResult(null); }}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                mode === 'beginner'
                  ? 'bg-pc-accent text-white'
                  : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-500'
              }`}
            >
              Beginner
            </button>
            <button
              onClick={() => { setMode('pro'); setScenarioIndex(0); setStep('intro'); setSelectedChecks([]); setRevealedCauses([]); setSelectedCause(null); setResult(null); }}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                mode === 'pro'
                  ? 'bg-pc-accent text-white'
                  : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-500'
              }`}
            >
              Pro
            </button>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {mode === 'beginner' ? 'Beginner: Common first-build issues only.' : 'Pro: All scenarios including thermal, performance, and compatibility.'}
          </p>
        </motion.div>

        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Case header */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryStyle}`}>
              {categoryLabel}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Case {scenarioIndex + 1} of {visibleScenarios?.length || 0}
            </span>
            <span className="text-sm px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 capitalize">
              {scenario.difficulty}
            </span>
          </div>

          {/* Intro / Case file */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-700/50 px-6 py-5 border-b border-slate-200 dark:border-slate-600">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{scenario.title}</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Symptoms */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Reported symptoms
                </h3>
                <ul className="space-y-1.5">
                  {scenario.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-amber-500 mt-0.5">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customer quote */}
              <div className="pl-4 border-l-4 border-pc-accent/50 bg-slate-50/50 dark:bg-slate-700/30 rounded-r-lg py-3">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Customer says</p>
                <p className="text-slate-700 dark:text-slate-300 italic">&ldquo;{scenario.observations}&rdquo;</p>
              </div>

              {step === 'intro' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-4"
                >
                  <button
                    onClick={handleStart}
                    className="w-full py-4 px-6 bg-pc-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-pc-accent/25"
                  >
                    Start investigation →
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Investigation phase */}
          {step === 'investigate' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-xl overflow-hidden"
            >
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
                <h3 className="font-bold text-slate-800 dark:text-white">Perform checks</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Simulate each check. What would you find?
                </p>
              </div>
              <div className="p-6 space-y-2">
                {scenario.checks.map((check) => {
                  const done = selectedChecks.includes(check.id)
                  return (
                    <button
                      key={check.id}
                      onClick={() => handlePerformCheck(check.id)}
                      disabled={done}
                      className={`
                        w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between
                        ${done
                          ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-pc-accent/50 hover:bg-pc-accent/5 dark:hover:bg-pc-accent/10'
                        }
                      `}
                    >
                      <span className={done ? 'text-slate-600 dark:text-slate-400' : 'text-slate-800 dark:text-white'}>
                        {check.action}
                      </span>
                      {done && (
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">
                          ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Diagnose phase */}
          {step === 'investigate' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-xl overflow-hidden"
            >
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
                <h3 className="font-bold text-slate-800 dark:text-white">Select root cause</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Based on symptoms and checks, what is the most likely cause?
                </p>
              </div>
              <div className="p-6 space-y-2">
                {scenario.possibleCauses.map((cause) => {
                  const isSelected = selectedCause === cause.id
                  const isCorrect = cause.id === scenario.rootCause
                  const showResult = result !== null

                  return (
                    <button
                      key={cause.id}
                      onClick={() => handleSelectCause(cause.id)}
                      disabled={selectedCause !== null}
                      className={`
                        w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between
                        ${showResult && isCorrect ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : ''}
                        ${showResult && isSelected && !isCorrect ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''}
                        ${!showResult && !selectedCause ? 'border-slate-200 dark:border-slate-600 hover:border-pc-accent/50 hover:bg-pc-blue/5' : ''}
                        ${selectedCause && !isSelected ? 'opacity-60' : ''}
                      `}
                    >
                      <div>
                        <span className={showResult && isCorrect ? 'text-emerald-700 dark:text-emerald-300 font-medium' : showResult && isSelected && !isCorrect ? 'text-red-700 dark:text-red-300' : 'text-slate-800 dark:text-white'}>
                          {cause.part}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm ml-2">({cause.likelihood})</span>
                      </div>
                      {showResult && isCorrect && <span className="text-emerald-600 font-bold">✓</span>}
                      {showResult && isSelected && !isCorrect && <span className="text-red-600 font-bold">✗</span>}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`
                  rounded-2xl p-6 border-2 shadow-xl
                  ${result === 'correct'
                    ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
                    : 'border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20'
                  }
                `}
              >
                {result === 'correct' ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl">
                        ✓
                      </span>
                      <div>
                        <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-lg">Good girl! 🎉</h3>
                        <p className="text-emerald-700 dark:text-emerald-400 text-sm">You nailed it, you identified the root cause like a real tech! My precious little princess. So proud of you. 💕</p>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-6">{scenario.fix}</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl">
                        ?
                      </span>
                      <div>
                        <h3 className="font-bold text-amber-800 dark:text-amber-300 text-lg">Not quite</h3>
                        <p className="text-amber-700 dark:text-amber-400 text-sm">
                          The actual cause: <strong>{correctCause?.part}</strong>
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-6">{scenario.fix}</p>
                  </>
                )}
                <button
                  onClick={handleNextScenario}
                  className="px-6 py-3 bg-pc-accent text-white font-semibold rounded-xl hover:bg-pc-accent-dark transition-colors shadow-lg"
                >
                  Next scenario →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
