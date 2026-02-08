/**
 * Professional Build - parts, constraints, compatibility
 * Prices approximate as of late 2024 / early 2025. Check PCPartPicker for live pricing.
 */

export const SHOPPING_LINKS = [
  { name: 'PCPartPicker', url: 'https://pcpartpicker.com', desc: 'Build compatibility, wattage calculator, price tracking across retailers' },
  { name: 'Newegg', url: 'https://newegg.com', desc: 'Major US retailer for PC parts' },
  { name: 'Amazon', url: 'https://amazon.com/s?k=pc+components', desc: 'Wide selection, often free shipping' },
  { name: 'B&H Photo', url: 'https://bhphotovideo.com', desc: 'Authorized dealer, no sales tax in many states' },
  { name: 'Micro Center', url: 'https://microcenter.com', desc: 'In-store pickup, CPU+MB bundles' },
  { name: 'Best Buy', url: 'https://bestbuy.com', desc: 'Retail + online PC components' },
]

export const USE_CASES = [
  { id: 'gaming', name: 'Gaming', priority: ['gpu', 'cpu', 'ram'], minRam: 16, minPsu: 550 },
  { id: 'office', name: 'Office / Productivity', priority: ['cpu', 'ram', 'storage'], minRam: 8, minPsu: 400 },
  { id: 'editing', name: 'Video / Photo Editing', priority: ['cpu', 'ram', 'gpu'], minRam: 32, minPsu: 650 },
  { id: 'streaming', name: 'Streaming / Content Creation', priority: ['cpu', 'gpu', 'ram'], minRam: 32, minPsu: 650 },
]

export const BUDGET_TIERS = [
  { id: 'budget', name: 'Budget ($500–800)', max: 800 },
  { id: 'mid', name: 'Mid-range ($800–1,400)', max: 1400 },
  { id: 'high', name: 'High-end ($1,400–2,500)', max: 2500 },
  { id: 'enthusiast', name: 'Enthusiast ($2,500+)', max: 5000 },
]

export const PARTS_CATALOG = {
  cpu: [
    { id: 'cpu1', name: 'Ryzen 5 5600', price: 125, socket: 'AM4', tdp: 65 },
    { id: 'cpu2', name: 'Ryzen 5 7600', price: 200, socket: 'AM5', tdp: 65 },
    { id: 'cpu3', name: 'Ryzen 7 5800X3D', price: 270, socket: 'AM4', tdp: 105 },
    { id: 'cpu4', name: 'Ryzen 7 7700X', price: 290, socket: 'AM5', tdp: 105 },
    { id: 'cpu5', name: 'Core i5-12400', price: 150, socket: 'LGA1700', tdp: 65 },
    { id: 'cpu6', name: 'Core i5-14600K', price: 280, socket: 'LGA1700', tdp: 125 },
    { id: 'cpu7', name: 'Core i7-13700K', price: 350, socket: 'LGA1700', tdp: 125 },
  ],
  motherboard: [
    { id: 'mb1', name: 'B550 (AM4)', price: 110, socket: 'AM4', formFactor: 'ATX' },
    { id: 'mb2', name: 'B650 (AM5)', price: 170, socket: 'AM5', formFactor: 'ATX' },
    { id: 'mb3', name: 'B660 (LGA1700)', price: 130, socket: 'LGA1700', formFactor: 'ATX' },
    { id: 'mb4', name: 'B760 (LGA1700)', price: 150, socket: 'LGA1700', formFactor: 'ATX' },
    { id: 'mb5', name: 'X670 (AM5)', price: 260, socket: 'AM5', formFactor: 'ATX' },
    { id: 'mb6', name: 'Z790 (LGA1700)', price: 240, socket: 'LGA1700', formFactor: 'ATX' },
  ],
  ram: [
    { id: 'ram1', name: '16GB DDR4-3200', price: 40, type: 'DDR4', speed: 3200 },
    { id: 'ram2', name: '32GB DDR4-3600', price: 70, type: 'DDR4', speed: 3600 },
    { id: 'ram3', name: '32GB DDR5-5600', price: 100, type: 'DDR5', speed: 5600 },
    { id: 'ram4', name: '32GB DDR5-6000', price: 115, type: 'DDR5', speed: 6000 },
    { id: 'ram5', name: '64GB DDR5-5600', price: 190, type: 'DDR5', speed: 5600 },
  ],
  gpu: [
    { id: 'gpu1', name: 'RX 6600', price: 220, tdp: 132 },
    { id: 'gpu2', name: 'RTX 4060', price: 300, tdp: 115 },
    { id: 'gpu3', name: 'RTX 4060 Ti', price: 380, tdp: 165 },
    { id: 'gpu4', name: 'RX 7700 XT', price: 420, tdp: 245 },
    { id: 'gpu5', name: 'RTX 4070', price: 520, tdp: 200 },
    { id: 'gpu6', name: 'RX 7800 XT', price: 480, tdp: 263 },
    { id: 'gpu7', name: 'Integrated only', price: 0, tdp: 0 },
  ],
  psu: [
    { id: 'psu1', name: '450W 80+ Bronze', price: 45, wattage: 450 },
    { id: 'psu2', name: '550W 80+ Bronze', price: 55, wattage: 550 },
    { id: 'psu3', name: '650W 80+ Gold', price: 85, wattage: 650 },
    { id: 'psu4', name: '750W 80+ Gold', price: 95, wattage: 750 },
    { id: 'psu5', name: '850W 80+ Gold', price: 115, wattage: 850 },
    { id: 'psu6', name: '1000W 80+ Gold', price: 140, wattage: 1000 },
  ],
  storage: [
    { id: 'ssd1', name: '500GB SATA SSD', price: 45 },
    { id: 'ssd2', name: '1TB NVMe Gen4', price: 75 },
    { id: 'ssd3', name: '2TB NVMe Gen4', price: 140 },
    { id: 'ssd4', name: '2TB NVMe Gen4 (fast)', price: 180 },
  ],
}

export function validateBuild(selections) {
  const issues = []
  const cpu = selections.cpu
  const mb = selections.motherboard
  const ram = selections.ram
  const gpu = selections.gpu
  const psu = selections.psu

  if (!cpu || !mb || !ram || !gpu || !psu) {
    return { valid: false, issues: ['Select all required parts'] }
  }

  // Socket match
  if (cpu.socket !== mb.socket) {
    issues.push(`CPU socket (${cpu.socket}) doesn't match motherboard (${mb.socket}). PC won't boot.`)
  }

  // Total power (rough estimate)
  const totalTdp = cpu.tdp + (gpu.tdp || 0) + 100 // +100 for rest
  const recommendedPsu = Math.ceil(totalTdp * 1.4)
  if (psu.wattage < totalTdp) {
    issues.push(`PSU (${psu.wattage}W) is undersized. System draw ~${totalTdp}W. Expect random shutdowns under load.`)
  } else if (psu.wattage < recommendedPsu) {
    issues.push(`PSU is marginal. Recommended ${recommendedPsu}W+ for headroom.`)
  }

  // RAM type (AM5 requires DDR5)
  if (mb.socket === 'AM5' && ram.type === 'DDR4') {
    issues.push('AM5 motherboards require DDR5. This RAM won\'t work.')
  }

  return {
    valid: issues.length === 0,
    issues,
    totalPrice: Object.values(selections).reduce((s, p) => s + (p?.price || 0), 0),
  }
}
