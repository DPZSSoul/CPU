/**
 * Mode card images for "Pick a path and dive in"
 * Local images with fallback
 */

const img = (file) => `/images/modes/${file}`

export const MODE_IMAGES = {
  learn: img('learn.jpg'),
  diagnose: img('diagnose.jpg'),
  build: img('build.jpg'),
  quiz: img('quiz.jpg'),
  thinking: img('thinking.jpg'),
  'what-if': img('what-if.jpg'),
  resources: img('resources.jpg'),
  dashboard: img('dashboard.jpg'),
}

export const MODE_IMAGE_FALLBACK = '/images/parts/motherboard.jpg'
