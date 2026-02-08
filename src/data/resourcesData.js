/**
 * Curated resources - tools, retailers, communities, benchmarks, guides
 */

export const RESOURCE_CATEGORIES = {
  buildPlanning: 'Build planning & compatibility',
  retailers: 'Where to buy',
  benchmarks: 'Benchmarks & reviews',
  communities: 'Communities & forums',
  diagnostics: 'Diagnostics & utilities',
  guides: 'Guides & tutorials',
}

export const BUILD_PLANNING = [
  { name: 'PCPartPicker', url: 'https://pcpartpicker.com', desc: 'Build compatibility checker, wattage calculator, price tracking across retailers. Essential for any build.' },
  { name: 'Logical Increments', url: 'https://www.logicalincrements.com', desc: 'Tiered build guides by budget. Great starting point for part selection.' },
  { name: 'PC Part Picker Build Guides', url: 'https://pcpartpicker.com/guide/', desc: 'Curated builds for different budgets and use cases.' },
]

export const RETAILERS = [
  { name: 'PCPartPicker', url: 'https://pcpartpicker.com', desc: 'Compare prices across Newegg, Amazon, B&H, Micro Center, and more.' },
  { name: 'Newegg', url: 'https://newegg.com', desc: 'Major US retailer. Often has combo deals and flash sales.' },
  { name: 'Amazon', url: 'https://amazon.com', desc: 'Wide selection, Prime shipping, easy returns.' },
  { name: 'B&H Photo', url: 'https://bhphotovideo.com', desc: 'Authorized dealer. No sales tax in many states. Good for high-end parts.' },
  { name: 'Micro Center', url: 'https://microcenter.com', desc: 'In-store only (US). CPU+motherboard bundles. Often best CPU prices.' },
  { name: 'Best Buy', url: 'https://bestbuy.com', desc: 'Retail + online. Price match. Geek Squad for complex builds.' },
]

export const BENCHMARKS_REVIEWS = [
  { name: "Tom's Hardware", url: 'https://www.tomshardware.com', desc: 'Reviews, benchmarks, buying guides. CPU and GPU hierarchy charts.' },
  { name: 'AnandTech', url: 'https://www.anandtech.com', desc: 'In-depth technical reviews. CPU, GPU, storage benchmarks.' },
  { name: 'TechPowerUp', url: 'https://www.techpowerup.com', desc: 'GPU database, reviews, GPU-Z utility. VRAM and specs.' },
  { name: 'Gamers Nexus', url: 'https://gamersnexus.net', desc: 'Rigorous testing methodology. Thermal, noise, build quality.' },
  { name: 'Hardware Unboxed', url: 'https://www.youtube.com/@HardwareUnboxed', desc: 'YouTube: CPU/GPU benchmarks, monitor reviews.' },
  { name: 'UserBenchmark', url: 'https://www.userbenchmark.com', desc: 'Quick comparison tool. Take with a grain of salt,use for ballpark only.' },
]

export const COMMUNITIES = [
  { name: 'r/buildapc', url: 'https://reddit.com/r/buildapc', desc: 'Build advice, part lists, troubleshooting. Active community.' },
  { name: 'r/buildapcforme', url: 'https://reddit.com/r/buildapcforme', desc: 'Post your budget and needs; get a full build list.' },
  { name: 'r/techsupport', url: 'https://reddit.com/r/techsupport', desc: 'General tech support. PC, software, drivers.' },
  { name: 'r/overclocking', url: 'https://reddit.com/r/overclocking', desc: 'CPU, RAM, GPU overclocking advice.' },
  { name: 'Linus Tech Tips Forum', url: 'https://linustechtips.com', desc: 'Large community. Build logs, troubleshooting.' },
  { name: 'Discord: PC Master Race', url: 'https://discord.gg/pcmr', desc: 'Real-time chat. Quick answers.' },
]

export const DIAGNOSTICS = [
  { name: 'HWiNFO', url: 'https://www.hwinfo.com', desc: 'Hardware monitoring. Temps, voltages, fan speeds, power draw. Free.' },
  { name: 'MemTest86', url: 'https://www.memtest86.com', desc: 'RAM testing. Boot from USB. Run overnight to test sticks.' },
  { name: 'CrystalDiskInfo', url: 'https://crystalmark.info', desc: 'Storage health. SMART data. See if drives are failing.' },
  { name: 'GPU-Z', url: 'https://www.techpowerup.com/gpuz', desc: 'GPU specs, temps, VRAM usage, clocks.' },
  { name: 'FurMark', url: 'https://geeks3d.com/furmark', desc: 'GPU stress test. Check temps and stability.' },
  { name: 'Prime95', url: 'https://www.mersenne.org/download', desc: 'CPU stress test. Maxes out all cores.' },
  { name: 'Display Driver Uninstaller (DDU)', url: 'https://www.guru3d.com/files-details/display-driver-uninstaller-download.html', desc: 'Clean GPU driver removal. Use in Safe Mode before reinstalling.' },
]

export const VIDEOS = [
  { title: 'How to Build a PC (Linus Tech Tips)', url: 'https://www.youtube.com/watch?v=BL4DCEp7blY', desc: 'Step-by-step build guide. Covers everything.' },
  { title: 'PC Parts Explained (Paul\'s Hardware)', url: 'https://www.youtube.com/watch?v=ExxFxF4N3no', desc: 'What each part does. Beginners.' },
  { title: 'PC Building Tips (JayzTwoCents)', url: 'https://www.youtube.com/watch?v=FK4YhLT4U0s', desc: 'Common mistakes to avoid.' },
  { title: 'First Time Building a PC (TechSource)', url: 'https://www.youtube.com/watch?v=IhX0fOUYd8Q', desc: 'Detailed walkthrough for first-timers.' },
  { title: 'Thermal Paste Application (JayzTwoCents)', url: 'https://www.youtube.com/watch?v=-pRN19r4jQ0', desc: 'Does application method matter? Spoiler: not much.' },
  { title: 'Cable Management (Linus Tech Tips)', url: 'https://www.youtube.com/watch?v=BL4DCEp7blY', desc: 'Clean builds. Route behind tray.' },
]

export const TROUBLESHOOTING_GUIDES = [
  { title: 'No POST troubleshooting', url: 'https://www.tomshardware.com/how-to/fix-pc-wont-turn-on', desc: 'Systematic approach when PC won\'t boot.' },
  { title: 'Blue screen guide', url: 'https://www.howtogeek.com/163452/how-to-prevent-and-troubleshoot-windows-blue-screen-errors', desc: 'BSOD causes and fixes.' },
  { title: 'PC overheating fix', url: 'https://www.tomshardware.com/how-to/fix-pc-overheating', desc: 'Cooling, paste, airflow.' },
]
