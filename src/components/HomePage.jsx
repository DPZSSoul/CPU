/**
 * Home - PC Learning Platform
 * Hero with image, rich mode cards (local images + fallback)
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MODE_IMAGES, MODE_IMAGE_FALLBACK } from '../data/modeImages'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1591799264318-7e6ef8d4428e?w=1200&q=85'

const MODES = [
  { id: 'learn', path: '/learn', title: 'Learn the Parts', subtitle: 'Deep dive into each component', desc: 'What it is, what it does, communication, problems, symptoms, and real world examples.', accent: 'blue', image: MODE_IMAGES.learn },
  { id: 'diagnose', path: '/diagnose', title: 'Diagnose Simulator', subtitle: 'Scenario based troubleshooting', desc: 'PC won\'t turn on? No display? Overheating? Work through real scenarios and learn to fix them.', accent: 'coral', image: MODE_IMAGES.diagnose },
  { id: 'build', path: '/build-pro', title: 'Professional Build', subtitle: 'Build with constraints', desc: 'Choose compatible parts for budget and use case. Avoid bottlenecks, power issues, and thermal problems.', accent: 'purple', image: MODE_IMAGES.build },
  { id: 'quiz', path: '/quiz', title: 'Quizzes & Knowledge Checks', subtitle: 'Topic based + final capstone', desc: 'Hardware basics, troubleshooting, compatibility, build order. Plus Final Capstone and Build Checklist.', accent: 'teal', image: MODE_IMAGES.quiz },
  { id: 'thinking', path: '/thinking', title: 'Technician Thinking', subtitle: 'Learn how to think', desc: 'Troubleshooting flowcharts, elimination method, cause vs symptom. Think like an IT pro.', accent: 'mint', image: MODE_IMAGES.thinking },
  { id: 'what-if', path: '/what-if', title: 'What Would Happen If...', subtitle: 'Interactive scenarios', desc: 'Explore common mistakes: DDR4 in AM5? Wrong PSU? Plastic on cooler? Click to reveal consequences.', accent: 'coral', image: MODE_IMAGES['what-if'] },
  { id: 'resources', path: '/resources', title: 'Resources & Links', subtitle: 'Further learning', desc: 'PCPartPicker, Logical Increments, r/buildapc, HWiNFO, MemTest86, and more curated tools.', accent: 'sky', image: MODE_IMAGES.resources },
  { id: 'dashboard', path: '/dashboard', title: 'Progress Dashboard', subtitle: 'Track your learning', desc: 'Topics completed, quiz scores, diagnosis success rate.', accent: 'sky', image: MODE_IMAGES.dashboard },
]

const ACCENT_STYLES = {
  blue: { bar: 'bg-pc-accent', overlay: 'from-pc-accent/80', text: 'text-pc-accent' },
  coral: { bar: 'bg-amber-600', overlay: 'from-amber-600/80', text: 'text-amber-600' },
  purple: { bar: 'bg-slate-700', overlay: 'from-slate-700/80', text: 'text-slate-700 dark:text-slate-300' },
  teal: { bar: 'bg-teal-600', overlay: 'from-teal-600/80', text: 'text-teal-600' },
  mint: { bar: 'bg-emerald-600', overlay: 'from-emerald-600/80', text: 'text-emerald-600' },
  sky: { bar: 'bg-sky-600', overlay: 'from-sky-600/80', text: 'text-sky-600' },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero with image */}
      <section className="relative overflow-hidden shadow-lg">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="PC components"
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              PC Learning Platform
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Build your confidence. From parts to troubleshooting, learn how computers work and think like a technician.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guided path */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 p-6 sm:p-8 shadow-sm"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Start here, recommended path
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Follow this order to build your knowledge step by step.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link to="/learn" className="px-5 py-2.5 rounded-lg bg-pc-accent text-white font-medium hover:bg-pc-accent-dark transition-colors shadow-sm">
              1. Learn the parts
            </Link>
            <span className="text-slate-400 text-lg">→</span>
            <Link to="/diagnose" className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              2. Diagnose
            </Link>
            <span className="text-slate-400 text-lg">→</span>
            <Link to="/build-pro" className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              3. Build
            </Link>
            <span className="text-slate-400 text-lg">→</span>
            <Link to="/quiz" className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              4. Quiz
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Mode cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Explore everything
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Pick a path and dive in
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODES.map((mode, i) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={mode.path}
                className="group block bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md hover:border-pc-accent/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-accent focus-visible:ring-offset-2"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={mode.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.target.onerror = null; e.target.src = MODE_IMAGE_FALLBACK }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${ACCENT_STYLES[mode.accent].overlay} to-transparent opacity-50`} />
                  <div className={`absolute bottom-2 left-4 ${ACCENT_STYLES[mode.accent].bar} h-0.5 rounded w-8`} />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-pc-accent transition-colors">
                    {mode.title}
                  </h3>
                  <p className={`text-sm font-medium ${ACCENT_STYLES[mode.accent].text} mb-2`}>
                    {mode.subtitle}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {mode.desc}
                  </p>
                  <span className="inline-block mt-2 text-pc-accent font-medium text-sm group-hover:translate-x-0.5 transition-transform">
                    Learn more →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
