/**
 * Cable connection data for Visual Cable Mode
 * Simplified concept-level wiring
 */

export const CABLE_CONNECTIONS = [
  { id: 'cable-motherboard', label: 'Power → Motherboard', emoji: '🔌', portId: 'port-motherboard' },
  { id: 'cable-cpu', label: 'Power → CPU', emoji: '🧠', portId: 'port-cpu' },
  { id: 'cable-gpu', label: 'Power → GPU', emoji: '🎮', portId: 'port-gpu' },
  { id: 'cable-storage', label: 'Power → Storage', emoji: '💾', portId: 'port-storage' },
]

export const CABLE_HINTS = {
  'cable-motherboard': "The big 24-pin cable plugs into the motherboard!",
  'cable-cpu': "The 8-pin CPU cable goes near the CPU.",
  'cable-gpu': "The GPU needs its own power cable,look for the 6+2 pin!",
  'cable-storage': "Storage drives need power and data,SATA cable!",
}
