/**
 * Real PC component photos - local images (always load)
 * Correct part-specific photos from Wikimedia Commons
 */

const img = (file) => `/images/parts/${file}`

export const PART_IMAGES = {
  cpu: img('cpu.jpg'),
  motherboard: img('motherboard.jpg'),
  ram: img('ram.jpg'),
  gpu: img('gpu.jpg'),
  vram: img('gpu.jpg'),
  psu: img('psu.jpg'),
  storage: img('storage.jpg'),
  cooling: img('cooling.jpg'),
  case: img('case.jpg'),
}

// Fallback emoji when image fails to load
export const PART_EMOJI = {
  cpu: '⚙️',
  motherboard: '🔌',
  ram: '📊',
  gpu: '🎮',
  vram: '🎞️',
  psu: '⚡',
  storage: '💾',
  cooling: '🌀',
  case: '📦',
}

// Alias for compatibility
export const PART_IMAGES_SAFE = PART_IMAGES
