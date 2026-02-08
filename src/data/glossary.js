/**
 * Glossary - PC/tech terms for quick lookup
 */

export const GLOSSARY_TERMS = {
  socket: {
    term: 'Socket',
    definition: 'The physical interface on the motherboard where the CPU connects. AMD uses AM4, AM5; Intel uses LGA1700, etc. CPU and motherboard socket must match.',
  },
  tdp: {
    term: 'TDP',
    definition: 'Thermal Design Power. Maximum heat (watts) a component produces under load. Used to size cooling and estimate power draw.',
  },
  pcie: {
    term: 'PCIe',
    definition: 'Peripheral Component Interconnect Express. High-speed bus for GPU, NVMe, and expansion cards. x16 for GPU, x4 for NVMe.',
  },
  ddr4: {
    term: 'DDR4',
    definition: 'Double Data Rate 4. Previous-gen RAM. 288 pins. Max ~3200 to 3600 MHz. Being replaced by DDR5.',
  },
  ddr5: {
    term: 'DDR5',
    definition: 'Double Data Rate 5. Newer RAM standard. Higher speeds (4800+ MHz), better efficiency. AM5 and newer Intel require DDR5.',
  },
  post: {
    term: 'POST',
    definition: 'Power-On Self-Test. Initial hardware check at boot. Beep codes indicate failure. No POST = hardware problem before OS loads.',
  },
  bios: {
    term: 'BIOS',
    definition: 'Basic Input/Output System. Firmware that initializes hardware at boot. Replaced by UEFI on modern boards.',
  },
  uefi: {
    term: 'UEFI',
    definition: 'Unified Extensible Firmware Interface. Modern replacement for BIOS. Faster boot, supports large drives, GUI.',
  },
  nvme: {
    term: 'NVMe',
    definition: 'Non-Volatile Memory Express. Protocol for fast SSD storage over PCIe. Much faster than SATA.',
  },
  sata: {
    term: 'SATA',
    definition: 'Serial ATA. Interface for SSDs and HDDs. Slower than NVMe. Uses data + power cables.',
  },
  vram: {
    term: 'VRAM',
    definition: 'Video RAM. Dedicated memory on the GPU for textures and frame buffers. Separate from system RAM.',
  },
  thermal: {
    term: 'Thermal throttling',
    definition: 'CPU or GPU slows itself down when too hot to prevent damage. Fix by improving cooling.',
  },
  xmp: {
    term: 'XMP',
    definition: 'Extreme Memory Profile. Intel preset for RAM overclocking. AMD equivalent is EXPO. Enables advertised RAM speed.',
  },
  form: {
    term: 'Form factor',
    definition: 'Physical size standard. ATX, Micro ATX, Mini ITX for motherboards. Must match case.',
  },
  igpu: {
    term: 'iGPU',
    definition: 'Integrated graphics. GPU built into the CPU. Good for office use; insufficient for gaming.',
  },
  wattage: {
    term: 'Wattage',
    definition: 'Power capacity in watts. PSU wattage must exceed total system draw. Add 20% headroom.',
  },
  expo: {
    term: 'EXPO',
    definition: 'AMD equivalent of XMP. Memory profile that runs RAM at advertised speed. Enable in BIOS.',
  },
  cache: {
    term: 'Cache',
    definition: 'Fast memory built into the CPU. L1, L2, L3 hold frequently used data so the CPU doesn\'t wait for RAM.',
  },
  dualchannel: {
    term: 'Dual channel',
    definition: 'Using 2 RAM sticks in correct slots doubles bandwidth. One stick = single channel = half speed.',
  },
  mhz: {
    term: 'MHz',
    definition: 'Megahertz. RAM speed,  3200 MHz = 3.2 billion transfers per second. Higher = faster.',
  },
  standoffs: {
    term: 'Standoffs',
    definition: 'Screws that raise the motherboard off the case. Prevents short circuits. Never mount board directly to metal.',
  },
  psu: {
    term: 'PSU',
    definition: 'Power Supply Unit. Converts wall power to voltages your PC needs. Don\'t cheap out.',
  },
  gpu: {
    term: 'GPU',
    definition: 'Graphics Processing Unit. Renders everything you see. Has its own VRAM. Plugs into PCIe slot.',
  },
  heatsink: {
    term: 'Heatsink',
    definition: 'Metal fins that absorb heat from CPU/GPU. Fans move air through them to cool.',
  },
}

export const GLOSSARY_ENTRIES = Object.entries(GLOSSARY_TERMS).map(([id, data]) => ({ id, ...data }))
