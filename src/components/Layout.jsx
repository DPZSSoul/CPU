/**
 * Layout - header, nav, help panel, AI chat, footer
 */

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SoundToggle from './SoundToggle'
import HelpPanel from './Help/HelpPanel'
import SearchModal from './Search/SearchModal'
import GlossaryModal from './Glossary/GlossaryModal'
import AIChatPanel from './AIChat/AIChatPanel'
import { getTopicFromPath } from '../utils/topicFromPath'
import { useTheme } from '../context/ThemeContext'
import { useProgress } from '../context/ProgressContext'

function LanguageToggle({ languageMode, setLanguageMode }) {
  const isPro = languageMode === 'professional'
  return (
    <button
      onClick={() => setLanguageMode(isPro ? 'beginner' : 'professional')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-accent"
      aria-label={isPro ? 'Switch to beginner' : 'Switch to professional'}
      title={isPro ? 'Beginner mode' : 'Professional mode'}
    >
      <span className="hidden sm:inline text-sm font-medium text-slate-600 dark:text-slate-400">
        {isPro ? 'Pro' : 'Beginner'}
      </span>
      <span className={`w-8 h-5 rounded-full relative transition-colors ${isPro ? 'bg-pc-accent' : 'bg-slate-300 dark:bg-slate-600'}`}>
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${isPro ? 'left-3.5' : 'left-0.5'}`} />
      </span>
    </button>
  )
}

export default function Layout({ languageMode, setLanguageMode, children }) {
  const location = useLocation()
  const topicId = getTopicFromPath(location.pathname)
  const { dark, toggle, fontSize, setFontSize } = useTheme()
  const { recordVisit } = useProgress()
  const [searchOpen, setSearchOpen] = useState(false)
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => { recordVisit() }, [recordVisit])

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((s) => !s)
      }
      if (e.key === 'g' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setGlossaryOpen((g) => !g)
      }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-[200%] px-4 py-2 bg-pc-accent text-white rounded font-medium focus:translate-y-0 focus:outline-none"
      >
        Skip to main content
      </a>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <GlossaryModal open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <AIChatPanel open={aiOpen} onClose={() => setAiOpen(false)} />

      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 no-print shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/"
              className="text-lg font-bold text-slate-900 dark:text-white hover:text-pc-accent transition-colors"
            >
              PC Learning Platform
            </Link>
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="sm:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
            </button>
            <nav className="hidden sm:flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
              title="Search (⌘K)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
              </svg>
              <span className="hidden md:inline">Search</span>
            </button>
            <button
              onClick={() => setGlossaryOpen(true)}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Glossary (⌘G)"
            >
              Glossary
            </button>
            <Link to="/learn" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Learn
            </Link>
            <Link to="/diagnose" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Diagnose
            </Link>
            <Link to="/build-pro" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Build
            </Link>
            <Link to="/quiz" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Quiz
            </Link>
            <Link to="/thinking" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Thinking
            </Link>
            <Link to="/what-if" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              What If
            </Link>
            <Link to="/resources" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Resources
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pc-accent px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Progress
            </Link>
            <button
              onClick={() => setAiOpen(true)}
              className="px-4 py-2 rounded-lg bg-pc-accent text-white text-sm font-semibold hover:bg-pc-accent-dark transition-colors shadow-sm border border-pc-accent-dark/20"
              title="Ask AI"
            >
              Ask AI
            </button>
            <button
              onClick={toggle}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label={dark ? 'Light mode' : 'Dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-500">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setFontSize(fontSize === 'large' ? 'normal' : 'large')}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title={fontSize === 'large' ? 'Normal text' : 'Larger text'}
              aria-label="Text size"
            >
              <span className="text-sm font-bold">A</span>
            </button>
            <SoundToggle />
            <LanguageToggle languageMode={languageMode} setLanguageMode={setLanguageMode} />
            </nav>
          </div>
          {/* Mobile nav dropdown */}
          {navOpen && (
            <div className="sm:hidden py-3 border-t border-slate-200 dark:border-slate-600 flex flex-col gap-1">
              <button onClick={() => { setGlossaryOpen(true); setNavOpen(false) }} className="px-4 py-2 text-left text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">Glossary</button>
              <Link to="/learn" className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setNavOpen(false)}>Learn</Link>
              <Link to="/diagnose" className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setNavOpen(false)}>Diagnose</Link>
              <Link to="/build-pro" className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setNavOpen(false)}>Build</Link>
              <Link to="/quiz" className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setNavOpen(false)}>Quiz</Link>
              <Link to="/resources" className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setNavOpen(false)}>Resources</Link>
              <Link to="/dashboard" className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setNavOpen(false)}>Progress</Link>
              <button onClick={() => { setAiOpen(true); setNavOpen(false) }} className="px-4 py-2 text-left bg-pc-accent text-white font-medium rounded mx-2 mt-2">
                Ask AI
              </button>
            </div>
          )}
        </div>
      </header>

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      <HelpPanel topicId={topicId} />

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-md hover:shadow-lg hover:border-pc-accent/50 text-slate-600 dark:text-slate-400 hover:text-pc-accent no-print transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-accent"
          aria-label="Back to top"
          title="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mx-auto">
            <path fillRule="evenodd" d="M11.47 4.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 no-print">
        <button
          onClick={() => setAiOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-pc-accent text-white font-semibold text-sm shadow-md hover:bg-pc-accent-dark hover:shadow-lg transition-all border border-pc-accent-dark/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-accent focus-visible:ring-offset-2"
          aria-label="I'm stuck - Ask AI"
          title="I'm stuck - Ask AI"
        >
          I&apos;m stuck
        </button>
      </div>

      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 text-center text-slate-500 dark:text-slate-400 text-sm safe-area-padding no-print">
        <p>PC Learning Platform. Prepare for IT, Helpdesk, and real world troubleshooting</p>
        <p className="mt-2 text-slate-600 dark:text-slate-300 font-medium">Made by Maurice. For his beloved wife, his good girl. 💕</p>
        <p className="mt-1 text-xs text-slate-400">
          Component images from <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">Wikimedia Commons</a> (CC licenses)
        </p>
      </footer>
    </div>
  )
}
