/**
 * Touch/mobile utilities for drag-and-drop
 * Larger activation distance on touch devices prevents accidental drag during scroll
 */

/** Detect touch-capable device */
export function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/** Drag activation distance - larger on touch for better scroll vs drag */
export const DRAG_ACTIVATION_DISTANCE = isTouchDevice() ? 12 : 8
