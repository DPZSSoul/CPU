import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Compatibility basics mini-lesson
 * Simple explanations - no math, no specs overload
 */
export default function CompatibilityBasics() {
  const topics = [
    {
      icon: '🔑',
      title: 'CPU ↔ Motherboard Socket',
      text: 'The CPU and motherboard must have the same socket (e.g. AM5, LGA1700). It\'s like a key and lock,they have to fit together.',
    },
    {
      icon: '📋',
      title: 'RAM Type & Speed',
      text: 'Motherboards support specific RAM (DDR4 or DDR5). Your RAM sticks must match what the board supports. Speed matters too!',
    },
    {
      icon: '⚡',
      title: 'PSU Wattage',
      text: 'Add up the power needs of your CPU and GPU. Get a PSU with at least that much wattage, plus 20% extra for safety.',
    },
    {
      icon: '📦',
      title: 'GPU Size vs Case',
      text: 'Cases come in sizes (ATX, Micro-ATX). Your motherboard must fit. Big GPUs need a case with enough room too!',
    },
  ]

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/complete"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-pc-blue font-medium mb-8 transition-colors"
      >
        ← Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          Compatibility Basics
        </h1>
        <p className="text-lg text-slate-600">
          When buying real parts, these need to match. Don't worry,sites like PCPartPicker check this for you!
        </p>
      </motion.div>

      <div className="space-y-6">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-200 hover:border-pc-blue/50 transition-colors"
          >
            <div className="flex gap-4">
              <span className="text-4xl">{topic.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">{topic.title}</h2>
                <p className="text-slate-600">{topic.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 bg-pc-mint/20 rounded-2xl border-2 border-pc-mint/50"
      >
        <p className="text-slate-700 font-medium">
          💡 Tip: Use{' '}
          <a
            href="https://pcpartpicker.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pc-blue hover:underline font-bold"
          >
            PCPartPicker.com
          </a>{' '}
          to build your list,it checks compatibility automatically.
        </p>
      </motion.div>

      <div className="mt-12 text-center">
        <Link
          to="/complete"
          className="
            inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl
            bg-gradient-to-r from-pc-blue to-pc-purple text-white
            shadow-lg hover:shadow-xl hover:scale-105 transition-all
            focus:outline-none focus-visible:ring-4 focus-visible:ring-pc-blue/50
          "
        >
          ← Back to completion
        </Link>
      </div>
    </section>
  )
}
