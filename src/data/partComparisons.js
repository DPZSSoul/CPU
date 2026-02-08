/**
 * Part comparison tables - when to pick which
 */

export const CPU_COMPARISON = [
  { part: 'Ryzen 5 5600', bestFor: 'Budget gaming, office', socket: 'AM4', note: 'Great value, DDR4' },
  { part: 'Ryzen 5 7600', bestFor: 'Mid-range gaming, new builds', socket: 'AM5', note: 'DDR5, upgrade path' },
  { part: 'Ryzen 7 5800X3D', bestFor: 'Gaming (3D cache)', socket: 'AM4', note: 'Huge for games' },
  { part: 'Core i5-12400', bestFor: 'Budget, office', socket: 'LGA1700', note: 'Good value' },
  { part: 'Core i5-14600K', bestFor: 'Gaming + productivity', socket: 'LGA1700', note: 'Strong all-rounder' },
]

export const RAM_COMPARISON = [
  { type: '16GB DDR4-3200', bestFor: 'Office, light gaming' },
  { type: '32GB DDR4-3600', bestFor: 'Gaming, multitasking' },
  { type: '32GB DDR5-5600', bestFor: 'New builds, AM5/Intel' },
  { type: '32GB DDR5-6000', bestFor: 'Sweet spot for DDR5' },
]

export const STORAGE_COMPARISON = [
  { type: 'SATA SSD', speed: '~550 MB/s', bestFor: 'Budget, older boards' },
  { type: 'NVMe Gen3', speed: '~3500 MB/s', bestFor: 'Most builds' },
  { type: 'NVMe Gen4', speed: '~7000 MB/s', bestFor: 'When board supports it' },
  { type: 'HDD', speed: '~150 MB/s', bestFor: 'Mass storage only' },
]
