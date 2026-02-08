/**
 * PartImage - Real component photo with emoji fallback
 * Rounded corners, object-fit for consistent framing
 */

import { useState } from 'react'
import { PART_IMAGES, PART_EMOJI } from '../data/partImages'

export default function PartImage({ partId, size = 'md', className = '' }) {
  const [errored, setErrored] = useState(false)
  const src = PART_IMAGES[partId]
  const emoji = PART_EMOJI[partId] || '•'

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  }

  const baseClass = `flex-shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center ring-2 ring-slate-200/80 dark:ring-slate-600 shadow-card ${sizeClasses[size]} ${className}`

  if (errored || !src) {
    return (
      <div className={`${baseClass} text-2xl`} title={partId}>
        {size === 'xs' ? '•' : emoji}
      </div>
    )
  }

  return (
    <div className={baseClass}>
      <img
        src={src}
        alt={partId}
        className="w-full h-full object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setErrored(true)}
      />
    </div>
  )
}
