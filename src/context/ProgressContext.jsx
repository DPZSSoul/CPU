/**
 * Progress tracking - persisted to localStorage
 * Tracks: completed modules, quiz attempts, scores, diagnosis success
 */

import { createContext, useContext, useReducer, useEffect } from 'react'
import { DEEP_PART_IDS } from '../data/deepLearning'

const STORAGE_KEY = 'pc-learning-progress'
const VALID_MODULE_IDS = new Set(DEEP_PART_IDS)

const initialState = {
  completedModules: [],
  quizAttempts: {},
  quizScores: {},
  diagnosisAttempts: 0,
  diagnosisSuccesses: 0,
  lastActivityDate: null,
  streakDays: 0,
  bookmarks: [],
  lastVisitDate: null,
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      const completedModules = (parsed.completedModules || []).filter((id) => VALID_MODULE_IDS.has(id))
      return { ...initialState, ...parsed, completedModules }
    }
  } catch (_) {}
  return initialState
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) {}
}

const actions = {
  COMPLETE_MODULE: 'COMPLETE_MODULE',
  QUIZ_ATTEMPT: 'QUIZ_ATTEMPT',
  DIAGNOSIS_ATTEMPT: 'DIAGNOSIS_ATTEMPT',
  DIAGNOSIS_SUCCESS: 'DIAGNOSIS_SUCCESS',
  VISIT: 'VISIT',
  TOGGLE_BOOKMARK: 'TOGGLE_BOOKMARK',
  RESET: 'RESET',
}

function reducer(state, action) {
  switch (action.type) {
    case actions.COMPLETE_MODULE:
      if (state.completedModules.includes(action.payload)) return state
      return {
        ...state,
        completedModules: [...state.completedModules, action.payload],
        lastActivityDate: new Date().toISOString().slice(0, 10),
      }
    case actions.QUIZ_ATTEMPT: {
      const { topicId, score, total } = action.payload
      const attempts = state.quizAttempts[topicId] || 0
      const scores = state.quizScores[topicId] || []
      return {
        ...state,
        quizAttempts: { ...state.quizAttempts, [topicId]: attempts + 1 },
        quizScores: { ...state.quizScores, [topicId]: [...scores, { score, total, date: new Date().toISOString().slice(0, 10) }] },
        lastActivityDate: new Date().toISOString().slice(0, 10),
      }
    }
    case actions.DIAGNOSIS_ATTEMPT:
      return {
        ...state,
        diagnosisAttempts: state.diagnosisAttempts + 1,
        lastActivityDate: new Date().toISOString().slice(0, 10),
      }
    case actions.DIAGNOSIS_SUCCESS:
      return {
        ...state,
        diagnosisSuccesses: state.diagnosisSuccesses + 1,
      }
    case actions.VISIT: {
      const today = new Date().toISOString().slice(0, 10)
      const last = state.lastVisitDate
      let streak = state.streakDays
      if (last) {
        const diff = Math.floor((new Date(today) - new Date(last)) / 86400000)
        if (diff === 0) streak = streak
        else if (diff === 1) streak++;
        else streak = 1
      } else streak = 1
      return { ...state, lastVisitDate: today, streakDays: streak }
    }
    case actions.TOGGLE_BOOKMARK: {
      const id = action.payload
      const has = state.bookmarks.includes(id)
      return {
        ...state,
        bookmarks: has ? state.bookmarks.filter((b) => b !== id) : [...state.bookmarks, id],
      }
    }
    case actions.RESET:
      return initialState
    default:
      return state
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const completeModule = (moduleId) => dispatch({ type: actions.COMPLETE_MODULE, payload: moduleId })
  const recordQuiz = (topicId, score, total) => dispatch({ type: actions.QUIZ_ATTEMPT, payload: { topicId, score, total } })
  const recordDiagnosisAttempt = () => dispatch({ type: actions.DIAGNOSIS_ATTEMPT })
  const recordDiagnosisSuccess = () => dispatch({ type: actions.DIAGNOSIS_SUCCESS })
  const recordVisit = () => dispatch({ type: actions.VISIT })
  const toggleBookmark = (id) => dispatch({ type: actions.TOGGLE_BOOKMARK, payload: id })
  const resetProgress = () => dispatch({ type: actions.RESET })

  const isModuleComplete = (id) => state.completedModules.includes(id)
  const REQUIRED_QUIZ_IDS = ['hardware-basics', 'troubleshooting', 'compatibility', 'build-order']
  const canAccessFinalQuiz = () => {
    return REQUIRED_QUIZ_IDS.every((id) => {
      const scores = state.quizScores[id] || []
      const best = Math.max(0, ...scores.map((s) => (s.score / s.total) * 100))
      return best >= 70
    })
  }
  const getQuizStats = (topicId) => ({
    attempts: state.quizAttempts[topicId] || 0,
    scores: state.quizScores[topicId] || [],
    bestScore: Math.round(Math.max(0, ...(state.quizScores[topicId] || []).map((s) => (s.score / s.total) * 100))),
  })
  const getOverallQuizStats = () => {
    const allScores = Object.values(state.quizScores).flat()
    const best = Math.max(0, ...allScores.map((s) => (s.score / s.total) * 100))
    const totalAttempts = Object.values(state.quizAttempts).reduce((a, b) => a + b, 0)
    return { attempts: totalAttempts, bestScore: Math.round(best) }
  }
  const diagnosisRate = state.diagnosisAttempts > 0
    ? Math.round((state.diagnosisSuccesses / state.diagnosisAttempts) * 100)
    : 0

  const totalModules = DEEP_PART_IDS.length
  const completedCount = state.completedModules.length
  const overallProgress = Math.round((completedCount / totalModules) * 100)

  const badges = []
  if (completedCount >= 1) badges.push({ id: 'first-module', name: 'First Step', desc: 'Completed 1 module' })
  if (completedCount >= 4) badges.push({ id: 'halfway', name: 'Halfway There', desc: 'Completed 4 modules' })
  if (completedCount >= 8) badges.push({ id: 'all-modules', name: 'Part Master', desc: 'Completed all modules' })
  if (state.diagnosisSuccesses >= 5) badges.push({ id: 'diagnoser', name: 'Diagnoser', desc: '5 correct diagnoses' })
  if (state.streakDays >= 3) badges.push({ id: 'streak-3', name: 'On Fire', desc: '3-day streak' })
  if (state.streakDays >= 7) badges.push({ id: 'streak-7', name: 'Week Warrior', desc: '7-day streak' })

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        completeModule,
        recordQuiz,
        recordDiagnosisAttempt,
        recordDiagnosisSuccess,
        recordVisit,
        toggleBookmark,
        resetProgress,
        isModuleComplete,
        getQuizStats,
        getOverallQuizStats,
        canAccessFinalQuiz,
        diagnosisRate,
        diagnosisAttempts: state.diagnosisAttempts,
        diagnosisSuccesses: state.diagnosisSuccesses,
        overallProgress,
        completedCount,
        totalModules,
        badges,
        isBookmarked: (id) => state.bookmarks.includes(id),
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
