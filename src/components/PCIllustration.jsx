/**
 * Animated PC case illustration for home screen
 * Slightly cartoony, friendly vibe
 */

import { motion } from 'framer-motion'

export default function PCIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative"
    >
      {/* PC Case - simplified friendly design */}
      <div className="relative w-48 h-56 sm:w-64 sm:h-72 mx-auto bg-gradient-to-b from-slate-300 to-slate-400 rounded-2xl shadow-2xl border-4 border-slate-500 overflow-hidden">
        {/* Front panel */}
        <div className="absolute inset-0 rounded-xl m-2 bg-slate-700/80 flex flex-col items-center justify-center gap-2 p-4">
          {/* Power button - glows */}
          <motion.div
            animate={{ boxShadow: ['0 0 8px #34D399', '0 0 16px #34D399', '0 0 8px #34D399'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-6 rounded-full bg-pc-mint border-2 border-green-400"
          />
          {/* Drive bays */}
          <div className="flex gap-2 mt-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="w-8 h-12 bg-slate-600 rounded border border-slate-500"
              />
            ))}
          </div>
          {/* Vent grille */}
          <div className="flex gap-1 mt-2">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.03 }}
                className="w-1 h-4 bg-slate-600 rounded-full origin-left"
              />
            ))}
          </div>
        </div>

        {/* Side window - shows "inside" */}
        <div className="absolute top-4 right-4 w-24 h-40 sm:w-32 sm:h-48 bg-slate-900/60 rounded-lg border-2 border-slate-600">
          {/* Mini parts inside */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-2 flex flex-col gap-1"
          >
            <div className="h-4 bg-amber-800/80 rounded" />
            <div className="h-6 bg-slate-600/80 rounded" />
            <div className="h-3 bg-blue-900/80 rounded" />
            <div className="h-3 bg-blue-900/80 rounded" />
          </motion.div>
        </div>

        {/* Floating part icons - decorative */}
        {['🧠', '🔌', '📋', '🎮'].map((emoji, i) => (
          <motion.span
            key={emoji}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.15, type: 'spring', stiffness: 200 }}
            className="absolute text-2xl"
            style={{
              top: `${20 + i * 15}%`,
              left: i % 2 === 0 ? '-12%' : 'auto',
              right: i % 2 === 1 ? '-12%' : 'auto',
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
