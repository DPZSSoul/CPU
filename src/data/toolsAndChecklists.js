/** Tools, shopping checklist, cable tips, RMA notes */

export const BUILD_TOOLS = [
  { name: 'Philips head screwdriver', note: '#2 size. Magnetic tip helps. Most screws in a PC are Philips.' },
  { name: 'Thermal paste', note: 'Most coolers include it. Extra tube (Arctic MX-4, etc.) is cheap insurance.' },
  { name: 'Zip ties or velcro straps', note: 'Cable management. Don\'t overtighten,allow airflow.' },
  { name: 'Flashlight or phone light', note: 'See inside the case. Dark corners hide connectors.' },
  { name: 'Antistatic wristband (optional)', note: 'Or touch the case frequently. Avoid carpet. Ground yourself before touching parts.' },
  { name: 'Tweezers (optional)', note: 'For small screws and front panel headers.' },
  { name: 'USB drive (8GB+)', note: 'For Windows installer and BIOS updates.' },
]

export const SHOPPING_CHECKLIST = [
  'CPU and motherboard have matching socket (AM5, LGA1700, etc.)',
  'RAM type matches motherboard (DDR4 vs DDR5)',
  'PSU wattage is enough (use PCPartPicker calculator; add 20% headroom)',
  'Case fits your motherboard size (ATX, mATX, ITX)',
  'GPU fits in case (check length in mm)',
  'Cooler fits in case (check height in mm)',
  'Storage has correct interface (NVMe M.2, SATA)',
  'All power cables available (CPU 8-pin, GPU 6+2 pin, etc.)',
  'Monitor has correct input (HDMI, DisplayPort)',
]

export const CABLE_TIPS = [
  'Route cables behind the motherboard tray when possible.',
  'Leave slack for components you might upgrade later.',
  'Tie cables in bundles,don\'t block fan airflow.',
  'Front panel wires: check mobo manual for pin layout. PWR_SW, LED+, LED-, etc.',
  '24 pin and CPU power are stiff, plug before mounting the board.',
  'Don\'t daisy chain PCIe cables for high end GPUs. Use separate cables.',
  'SATA data and power cables: secure connection. Loose = drive not detected.',
]

export const RMA_NOTES = [
  'Keep the box and packaging until you\'re sure everything works.',
  'Note the return window: usually 14–30 days for refunds.',
  'For defective parts: contact seller first, then manufacturer.',
  'Take photos of damage before returning. Document serial numbers.',
  'Some retailers (Amazon, Newegg) have easier RMA than others.',
  'Micro Center: in-store exchange often same day. Bring receipt.',
  'Never use modular PSU cables from a different PSU, pinouts differ.',
]
