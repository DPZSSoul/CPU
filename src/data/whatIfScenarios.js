/**
 * "What would happen if" - interactive scenarios
 */

export const WHAT_IF_SCENARIOS = [
  {
    id: 'w1',
    scenario: 'What if you put DDR4 RAM in an AM5 motherboard?',
    answer: 'It won\'t fit. DDR4 and DDR5 have different key notches. AM5 boards only accept DDR5. You\'d need to buy DDR5.',
    category: 'compatibility',
  },
  {
    id: 'w2',
    scenario: 'What if you forget thermal paste when installing a CPU cooler?',
    answer: 'The CPU will overheat quickly. Air gaps between cooler and CPU prevent heat transfer. You\'ll get thermal throttling or shutdown within minutes of load.',
    category: 'thermal',
  },
  {
    id: 'w3',
    scenario: 'What if you use a 450W PSU with an RTX 4070 and Ryzen 7?',
    answer: 'Random shutdowns under load. The GPU alone can draw 200W; CPU ~105W; rest of system ~100W. Total exceeds 450W. Need 650W+ with headroom.',
    category: 'power',
  },
  {
    id: 'w4',
    scenario: 'What if you plug the monitor into the motherboard but you have a dedicated GPU?',
    answer: 'No display (or display from integrated graphics if enabled). The motherboard ports are often disabled when a GPU is detected. Plug into the GPU outputs.',
    category: 'user-error',
  },
  {
    id: 'w5',
    scenario: 'What if you mix RAM sticks from different kits?',
    answer: 'May work, may not. Different timings can cause instability. XMP might not work. Best to use matched kit. If mixing, same speed and capacity recommended.',
    category: 'compatibility',
  },
  {
    id: 'w6',
    scenario: 'What if you leave the plastic film on the CPU cooler cold plate?',
    answer: 'CPU overheats. Plastic blocks heat transfer. Very common first-build mistake. Remove before mounting.',
    category: 'thermal',
  },
  {
    id: 'w7',
    scenario: 'What if you use modular PSU cables from a different brand?',
    answer: 'Dangerous. Pinouts differ between brands. Can fry drives, GPU, or motherboard. Only use cables that came with your PSU.',
    category: 'power',
  },
  {
    id: 'w8',
    scenario: 'What if you install an M.2 drive at an angle without fully seating it?',
    answer: 'Drive won\'t be detected. M.2 must be inserted at 30° then pressed down and screwed. Partial install is common,reseat firmly.',
    category: 'user-error',
  },
]
