/**
 * Confetti - delightful but not overwhelming
 * Single burst for part placement, gentle stream for completion
 */

import confetti from 'canvas-confetti'

const COLORS = ['#3B82F6', '#8B5CF6', '#14B8A6', '#34D399', '#F97316']

/** Short burst on correct part placement */
export function fireConfetti() {
  confetti({
    particleCount: 40,
    spread: 55,
    origin: { y: 0.65 },
    colors: COLORS,
    ticks: 80,
  })
}

/** Gentle celebration stream for build completion */
export function fireCompleteConfetti() {
  const duration = 2500
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 50,
      origin: { x: 0 },
      colors: COLORS,
      ticks: 60,
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 50,
      origin: { x: 1 },
      colors: COLORS,
      ticks: 60,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}
