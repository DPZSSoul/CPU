/**
 * Derive help topic ID from current path
 */

export function getTopicFromPath(pathname) {
  if (pathname.startsWith('/learn/')) {
    const partId = pathname.split('/')[2]
    return partId ? `learn-${partId}` : 'learn'
  }
  if (pathname.startsWith('/diagnose')) return 'diagnose'
  if (pathname.startsWith('/quiz')) return 'quiz'
  if (pathname.startsWith('/build-pro')) return 'build'
  if (pathname.startsWith('/thinking')) return 'thinking'
  if (pathname.startsWith('/dashboard')) return 'default'
  return 'default'
}
