/**
 * Final Capstone - Build readiness checklist
 * Step by step tasks to prove end-to-end understanding
 */

export const CAPSTONE_TASKS = [
  {
    id: 'prep',
    phase: 'Before You Buy',
    tasks: [
      { id: 'prep-1', text: 'Verify CPU and motherboard socket match (AM4, AM5, LGA1700)' },
      { id: 'prep-2', text: 'Confirm RAM type matches board (DDR4 vs DDR5)' },
      { id: 'prep-3', text: 'Check PSU wattage (use PCPartPicker) + 20% headroom' },
      { id: 'prep-4', text: 'Verify case fits motherboard form factor (ATX, mATX, ITX)' },
      { id: 'prep-5', text: 'Check GPU length and CPU cooler height vs case specs' },
    ],
  },
  {
    id: 'tools',
    phase: 'Tools & Workspace',
    tasks: [
      { id: 'tools-1', text: 'Phillips #2 screwdriver (magnetic tip helps)' },
      { id: 'tools-2', text: 'Thermal paste (most coolers include it)' },
      { id: 'tools-3', text: 'Anti-static: wristband or touch case frequently' },
      { id: 'tools-4', text: 'Workspace: flat, well-lit, avoid carpet' },
    ],
  },
  {
    id: 'install',
    phase: 'Installation Order',
    tasks: [
      { id: 'inst-1', text: 'Install CPU into socket (match triangle, no force)' },
      { id: 'inst-2', text: 'Apply thermal paste, mount cooler (remove plastic first!)' },
      { id: 'inst-3', text: 'Install RAM in correct slots (check manual for dual-channel)' },
      { id: 'inst-4', text: 'Install M.2 drive if using (30° angle, screw down)' },
      { id: 'inst-5', text: 'Mount motherboard in case with standoffs' },
      { id: 'inst-6', text: 'Connect 24-pin and 8-pin CPU power' },
      { id: 'inst-7', text: 'Install GPU, connect PCIe power' },
      { id: 'inst-8', text: 'Connect front panel (PWR_SW, LED, etc.)' },
      { id: 'inst-9', text: 'Connect storage (SATA data + power if applicable)' },
    ],
  },
  {
    id: 'first-boot',
    phase: 'First Boot',
    tasks: [
      { id: 'boot-1', text: 'Breadboard test outside case (optional but recommended)' },
      { id: 'boot-2', text: 'Verify monitor cable in GPU port (not motherboard)' },
      { id: 'boot-3', text: 'Enter BIOS (Del/F2), check RAM detected' },
      { id: 'boot-4', text: 'Enable XMP/EXPO if RAM below advertised speed' },
      { id: 'boot-5', text: 'Set boot order (USB first if installing from USB)' },
      { id: 'boot-6', text: 'Install Windows' },
      { id: 'boot-7', text: 'Install chipset drivers from motherboard site' },
      { id: 'boot-8', text: 'Install GPU drivers from NVIDIA or AMD' },
    ],
  },
  {
    id: 'troubleshooting',
    phase: 'If Something Goes Wrong',
    tasks: [
      { id: 'ts-1', text: 'No power: Check PSU switch, cable, outlet, front panel connector' },
      { id: 'ts-2', text: 'No display: Reseat RAM, try one stick, check GPU port' },
      { id: 'ts-3', text: 'No POST: Reseat CPU power, check all connections' },
      { id: 'ts-4', text: 'Overheating: Verify cooler plastic removed, paste applied' },
      { id: 'ts-5', text: 'Random shutdowns: Check PSU wattage, thermal throttling' },
    ],
  },
]
