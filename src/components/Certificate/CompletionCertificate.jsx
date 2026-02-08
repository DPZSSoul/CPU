/**
 * Completion Certificate - when all modules are done
 */

import { motion } from 'framer-motion'

export default function CompletionCertificate() {
  const printDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-pc-mint shadow-xl overflow-hidden print:shadow-none print:border-2"
    >
      <div className="p-8 sm:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pc-mint/20 flex items-center justify-center text-3xl">
          ✓
        </div>
        <h2 className="text-xl font-semibold text-pc-teal mb-1">Good job, pumpkin! 🎉</h2>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Certificate of Completion
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          You did it! This certifies that BB has completed all component modules and demonstrated understanding of PC hardware, diagnosis, and technician thinking. My precious little princess, I&apos;m so proud of you for learning all of this. Love you always. 💕
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500">{printDate}</p>
        <button
          onClick={() => window.print()}
          className="mt-6 px-6 py-2 bg-pc-blue text-white font-medium rounded-lg hover:bg-pc-purple transition-colors print:hidden"
        >
          Print certificate
        </button>
      </div>
    </motion.div>
  )
}
