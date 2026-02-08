/**
 * Resources - curated links, videos, budget builds, tools, tips
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BUDGET_BUILDS } from '../../data/budgetBuilds'
import { BUILD_TOOLS, SHOPPING_CHECKLIST, CABLE_TIPS, RMA_NOTES } from '../../data/toolsAndChecklists'
import {
  BUILD_PLANNING,
  RETAILERS,
  BENCHMARKS_REVIEWS,
  COMMUNITIES,
  DIAGNOSTICS,
  VIDEOS,
  TROUBLESHOOTING_GUIDES,
} from '../../data/resourcesData'
import { POST_BUILD_STEPS, DRIVER_LINKS } from '../../data/postBuildGuide'
import { CPU_COMPARISON, RAM_COMPARISON, STORAGE_COMPARISON } from '../../data/partComparisons'
import TroubleshootingFlowchart from './TroubleshootingFlowchart'
import BuildDayCheatSheet from './BuildDayCheatSheet'

const ResourceCard = ({ item, index }) => (
  <motion.a
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.03 }}
    className="block p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-pc-blue/50 hover:shadow-md transition-all bg-white dark:bg-slate-800"
  >
    <h3 className="font-semibold text-slate-900 dark:text-white">{item.name}</h3>
    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
    <span className="text-xs text-pc-accent font-medium mt-2 inline-block">→ Open</span>
  </motion.a>
)

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Resources & Links
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
          Curated tools, videos, guides, retailers, and communities for building, troubleshooting, and learning.
        </p>
      </motion.div>

      {/* Quick links to app features */}
      <div className="flex flex-wrap gap-2 mb-12">
        <Link to="/myths" className="px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors">
          Myth vs Fact
        </Link>
        <Link to="/pronunciation" className="px-4 py-2 rounded-xl bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200 font-medium hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-colors">
          How to Say It
        </Link>
        <Link to="/flash-cards" className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors">
          Flash Cards
        </Link>
        <Link to="/slang" className="px-4 py-2 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200 font-medium hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors">
          Slang Decoder
        </Link>
        <Link to="/photo-quiz" className="px-4 py-2 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200 font-medium hover:bg-rose-200 dark:hover:bg-rose-900/50 transition-colors">
          Photo Quiz
        </Link>
        <Link to="/build-dream" className="px-4 py-2 rounded-xl bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 font-medium hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors">
          Dream PC
        </Link>
        <Link to="/shopping-checklist" className="px-4 py-2 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 font-medium hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors">
          Shopping Checklist
        </Link>
        <Link to="/build-pro" className="px-4 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
          PC Builder
        </Link>
        <Link to="/capstone" className="px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors">
          Build Checklist
        </Link>
      </div>

      {/* Troubleshooting flowchart */}
      <section className="mb-12">
        <TroubleshootingFlowchart />
      </section>

      {/* Build day cheat sheet */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Build day cheat sheet</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          One-page printable reference. Print and keep it handy during your build.
        </p>
        <BuildDayCheatSheet />
        <button
          onClick={() => window.print()}
          className="mt-4 px-6 py-3 bg-pc-accent text-white font-medium rounded-xl hover:bg-pc-accent-dark transition-colors print:hidden"
        >
          Print cheat sheet
        </button>
      </section>

      {/* Post-build guide */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Post-build setup guide</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          What to do after first boot: BIOS, Windows, drivers.
        </p>
        <div className="space-y-6">
          {POST_BUILD_STEPS.map((phase) => (
            <div key={phase.phase} className="p-5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">{phase.phase}</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                {phase.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50">
          <p className="font-medium text-slate-900 dark:text-white mb-2">Driver downloads</p>
          <div className="flex flex-wrap gap-2">
            {DRIVER_LINKS.map((d) => (
              <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer" className="text-pc-accent font-medium hover:underline">
                {d.name} →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Part comparison */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">When to pick which</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Quick comparison tables for common choices.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 overflow-x-auto">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">CPU</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-200 dark:border-slate-600">
                  <th className="py-2 pr-2">Part</th>
                  <th className="py-2">Best for</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                {CPU_COMPARISON.map((r, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-700">
                    <td className="py-2 pr-2 font-medium text-slate-800 dark:text-slate-200">{r.part}</td>
                    <td className="py-2">{r.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">RAM</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-200 dark:border-slate-600">
                  <th className="py-2 pr-2">Type</th>
                  <th className="py-2">Best for</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                {RAM_COMPARISON.map((r, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-700">
                    <td className="py-2 pr-2 font-medium text-slate-800 dark:text-slate-200">{r.type}</td>
                    <td className="py-2">{r.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Storage</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-200 dark:border-slate-600">
                  <th className="py-2 pr-2">Type</th>
                  <th className="py-2">Best for</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                {STORAGE_COMPARISON.map((r, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-700">
                    <td className="py-2 pr-2 font-medium text-slate-800 dark:text-slate-200">{r.type}</td>
                    <td className="py-2">{r.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Build planning */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Build planning & compatibility</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUILD_PLANNING.map((r, i) => (
            <ResourceCard key={r.name} item={r} index={i} />
          ))}
        </div>
      </section>

      {/* Retailers */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Where to buy parts</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Compare prices. PCPartPicker aggregates live prices from major retailers.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RETAILERS.map((r, i) => (
            <ResourceCard key={r.name} item={r} index={i} />
          ))}
        </div>
      </section>

      {/* Benchmarks & reviews */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Benchmarks & reviews</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Compare performance before buying. Look at real benchmarks, not just specs.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENCHMARKS_REVIEWS.map((r, i) => (
            <ResourceCard key={r.name} item={r} index={i} />
          ))}
        </div>
      </section>

      {/* Communities */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Communities & forums</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Get help, share builds, ask questions. Be respectful and include your budget and use case.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMMUNITIES.map((r, i) => (
            <ResourceCard key={r.name} item={r} index={i} />
          ))}
        </div>
      </section>

      {/* Diagnostics */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Diagnostics & utilities</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Monitor temps, test RAM, check drive health. Essential for troubleshooting.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIAGNOSTICS.map((r, i) => (
            <ResourceCard key={r.name} item={r} index={i} />
          ))}
        </div>
      </section>

      {/* Videos */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Video tutorials</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {VIDEOS.map((v, i) => (
            <motion.a
              key={v.url}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="block p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-pc-blue/50 hover:shadow-md transition-all bg-white dark:bg-slate-800"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{v.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{v.desc}</p>
              <span className="text-xs text-pc-accent mt-2 inline-block">→ Watch on YouTube</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Troubleshooting guides */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Troubleshooting guides</h2>
        <div className="space-y-4">
          {TROUBLESHOOTING_GUIDES.map((g, i) => (
            <motion.a
              key={g.url}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="block p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-pc-blue/50 hover:shadow-md transition-all bg-white dark:bg-slate-800"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{g.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{g.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Budget builds */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Budget build examples</h2>
        <div className="space-y-6">
          {BUDGET_BUILDS.map((b) => (
            <div key={b.budget} className="p-6 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">{b.name}, {b.use}</h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                {b.parts.map((p) => (
                  <li key={p.name}><strong className="text-slate-700 dark:text-slate-300">{p.name}:</strong> {p.pick}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-500 italic">{b.notes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">What you need to build</h2>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          {BUILD_TOOLS.map((t) => (
            <li key={t.name}><strong>{t.name}</strong>, {t.note}</li>
          ))}
        </ul>
      </section>

      {/* Shopping checklist */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Shopping checklist</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-3">Before you buy, verify:</p>
        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
          {SHOPPING_CHECKLIST.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Cable tips */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Cable management tips</h2>
        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
          {CABLE_TIPS.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>

      {/* RMA */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">If something arrives broken (RMA)</h2>
        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
          {RMA_NOTES.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </section>

      <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Glossary</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Use the Glossary button in the header (or press ⌘G / Ctrl+G) to look up terms like socket, TDP, PCIe, DDR4/DDR5, POST, XMP, and more.
        </p>
      </div>
    </div>
  )
}
