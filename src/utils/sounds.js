/**
 * Sound effects - subtle, non-annoying feedback
 * Uses Howler.js with free Mixkit SFX
 */

import { Howl } from 'howler'

const SOUND_URLS = {
  success: 'https://assets.mixkit.co/active_storage/sfx/2869-success.mp3',
  wrong: 'https://assets.mixkit.co/active_storage/sfx/3010-little-error.mp3',
  drop: 'https://assets.mixkit.co/active_storage/sfx/2000-paper-snip.mp3',
  complete: 'https://assets.mixkit.co/active_storage/sfx/2018-success-sound-effect.mp3',
}

// Subtle volumes - pleasant, not jarring
const VOLUME = { success: 0.35, wrong: 0.25, drop: 0.2, complete: 0.45 }

let sounds = {}
let initialized = false
let muted = false

/** Initialize muted from localStorage on load */
try {
  muted = localStorage.getItem('pc-builder-muted') === 'true'
} catch (_) {}

/** Persist mute preference */
export function setMuted(value) {
  muted = value
  try {
    localStorage.setItem('pc-builder-muted', String(value))
  } catch (_) {}
}

export function isMuted() {
  return muted
}

function ensureSounds() {
  if (initialized) return
  try {
    sounds.success = new Howl({ src: [SOUND_URLS.success], volume: VOLUME.success })
    sounds.wrong = new Howl({ src: [SOUND_URLS.wrong], volume: VOLUME.wrong })
    sounds.drop = new Howl({ src: [SOUND_URLS.drop], volume: VOLUME.drop })
    sounds.complete = new Howl({ src: [SOUND_URLS.complete], volume: VOLUME.complete })
    initialized = true
  } catch (e) {
    console.warn('Sounds could not load:', e)
  }
}

/** Play on correct placement - subtle positive chime */
export function playSuccess() {
  if (muted) return
  ensureSounds()
  try {
    sounds.success?.play()
  } catch (_) {}
}

/** Play on wrong placement - gentle, not punishing */
export function playWrong() {
  if (muted) return
  ensureSounds()
  try {
    sounds.wrong?.play()
  } catch (_) {}
}

/** Play on drop/snap */
export function playDrop() {
  if (muted) return
  ensureSounds()
  try {
    sounds.drop?.play()
  } catch (_) {}
}

/** Play on build completion */
export function playComplete() {
  if (muted) return
  ensureSounds()
  try {
    sounds.complete?.play()
  } catch (_) {}
}
