/**
 * Post-build setup guide - what to do after first boot
 */

export const POST_BUILD_STEPS = [
  {
    phase: 'Before installing Windows',
    steps: [
      'Enter BIOS (Del or F2 at boot)',
      'Check RAM is detected and at correct speed',
      'Enable XMP/EXPO if RAM runs below advertised speed',
      'Set boot order: USB first if installing from USB, or NVMe/SATA first if OS drive is ready',
      'Check CPU/GPU temps are reasonable (should be low at idle)',
    ],
  },
  {
    phase: 'Install Windows',
    steps: [
      'Create Windows install USB with Media Creation Tool',
      'Boot from USB, follow installer',
      'When asked, choose "Custom" and select your drive',
      'Format if needed, then install',
      'Remove USB when prompted to restart',
    ],
  },
  {
    phase: 'After Windows install',
    steps: [
      'Run Windows Update (Settings → Update)',
      'Install chipset drivers from motherboard manufacturer site',
      'Install GPU drivers from NVIDIA or AMD',
      'Install other drivers if needed (audio, LAN, etc.)',
      'Disable unnecessary startup programs (Task Manager → Startup)',
    ],
  },
  {
    phase: 'Verify everything works',
    steps: [
      'Check Device Manager for missing drivers (no yellow icons)',
      'Run a quick stress test (optional: Prime95 for CPU, FurMark for GPU)',
      'Monitor temps with HWiNFO, CPU under 90°C, GPU under 85°C under load',
      'Test all USB ports, audio, network',
    ],
  },
]

export const DRIVER_LINKS = [
  { name: 'NVIDIA GPU', url: 'https://www.nvidia.com/Download/index.aspx' },
  { name: 'AMD GPU', url: 'https://www.amd.com/en/support' },
  { name: 'Intel', url: 'https://www.intel.com/content/www/us/en/download-center.html' },
]
