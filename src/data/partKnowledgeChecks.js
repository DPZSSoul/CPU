/**
 * Quick knowledge check questions for each Learn part
 * 1-2 questions at the end of each part module
 */

export const PART_KNOWLEDGE_CHECKS = {
  cpu: [
    { q: 'What does more cores typically help with?', options: ['Gaming FPS only', 'Multitasking, streaming, video editing', 'Boot speed'], correct: 1 },
    { q: 'Why can\'t you compare GHz across AMD and Intel?', options: ['You can,they\'re the same', 'Different architectures,benchmarks matter', 'Intel is always faster'], correct: 1 },
  ],
  motherboard: [
    { q: 'What must match between CPU and motherboard?', options: ['Brand only', 'Socket', 'RAM amount'], correct: 1 },
    { q: 'What happens if you mount the board without standoffs?', options: ['Nothing', 'Short circuit,can fry the board', 'Slower boot'], correct: 1 },
  ],
  ram: [
    { q: 'Why use two RAM sticks instead of one?', options: ['Looks better', 'Dual-channel doubles bandwidth', 'Saves money'], correct: 1 },
    { q: 'Can you mix DDR4 and DDR5?', options: ['Yes', 'No,different physical slots'], correct: 1 },
  ],
  gpu: [
    { q: 'Where should the monitor plug in when using a dedicated GPU?', options: ['Motherboard ports', 'GPU ports on the back', 'Either works'], correct: 1 },
    { q: 'What is VRAM used for?', options: ['System files', 'Textures, frame buffers,GPU rendering', 'Boot order'], correct: 1 },
  ],
  vram: [
    { q: 'Running out of VRAM causes what?', options: ['Faster loading', 'Stuttering or crashes in games', 'Better FPS'], correct: 1 },
  ],
  psu: [
    { q: 'Is it safe to use modular cables from a different PSU?', options: ['Yes', 'No,pinouts differ, can damage parts'], correct: 1 },
    { q: 'How much headroom should the PSU have?', options: ['Exact wattage is fine', '20%+ above total draw'], correct: 1 },
  ],
  storage: [
    { q: 'NVMe vs SATA SSD,which is faster?', options: ['SATA', 'NVMe', 'Same speed'], correct: 1 },
    { q: 'M.2 drive not detected. First thing to check?', options: ['Replace it', 'Reseat it,partial install is common'], correct: 1 },
  ],
  cooling: [
    { q: 'Before installing the CPU cooler, you must:', options: ['Add extra paste', 'Remove plastic from cold plate', 'Mount without paste'], correct: 1 },
  ],
  case: [
    { q: 'What must match between case and motherboard?', options: ['Color', 'Form factor (ATX, mATX, ITX)', 'Brand'], correct: 1 },
  ],
}
