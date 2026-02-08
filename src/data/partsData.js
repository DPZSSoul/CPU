/**
 * Parts data for the PC building tutorial
 * Each part has: id, name, description, analogies, and build order
 */

export const PARTS = [
  {
    id: 'motherboard',
    name: 'Motherboard',
    emoji: '🔌',
    whatItDoes: 'Think of it as the "main road" of your PC. Everything connects to it!',
    whatHappensWithout: "Your parts would have nowhere to plug in. It's like a city with no streets!",
    funAnalogy: 'The motherboard is like the skeleton of your PC,all the organs plug into it.',
    whyItMatters: 'Without it, your parts can\'t talk to each other.',
    explainMore: 'The motherboard is a large circuit board that holds all your components. It has slots and connectors for everything you\'ll add. Sizes include ATX, Micro-ATX, and Mini-ITX.',
    explainDetails: 'It has a CPU socket, RAM slots, PCIe slots for GPU, SATA ports for storage, and power connectors.',
    buildOrder: 1,
  },
  {
    id: 'cpu',
    name: 'CPU',
    emoji: '🧠',
    whatItDoes: 'The brain of your computer. It does all the thinking and calculations.',
    whatHappensWithout: 'Nothing would run! No programs, no games, no browsing.',
    funAnalogy: 'The CPU is like the brain,it tells everyone else what to do.',
    whyItMatters: 'A faster CPU = faster computer!',
    explainMore: 'CPU stands for Central Processing Unit. It executes instructions from programs. Games, apps, and browsing all need it.',
    explainDetails: 'CPUs plug into a socket on the motherboard. Different CPUs need different sockets (like AM5 or LGA1700),they must match!',
    buildOrder: 2,
  },
  {
    id: 'cpu-cooler',
    name: 'CPU Cooler',
    emoji: '❄️',
    whatItDoes: 'Keeps your CPU from getting too hot! CPUs work hard and need a fan to stay cool.',
    whatHappensWithout: 'Your CPU would overheat and shut down,or get damaged.',
    funAnalogy: 'Think of it like an air conditioner for your CPU\'s brain.',
    whyItMatters: 'A hot CPU slows down or can shut off. This keeps it safe!',
    explainMore: 'CPUs generate heat when working. The cooler (often a fan + metal heatsink) pulls heat away.',
    explainDetails: 'Airflow matters! Cool air comes in the front, warm air goes out the back. Good cable management helps airflow.',
    buildOrder: 3,
  },
  {
    id: 'ram',
    name: 'RAM',
    emoji: '📋',
    whatItDoes: 'Short-term memory. Your PC uses it to remember what you\'re doing right now.',
    whatHappensWithout: 'Your PC would be super slow,or couldn\'t run programs at all.',
    funAnalogy: 'RAM is like a desk. Bigger desk = more papers (apps) you can have open at once.',
    whyItMatters: 'More RAM = you can run more apps at once without slowing down.',
    explainMore: 'RAM stands for Random Access Memory. It\'s quick to access but cleared when you turn off the PC.',
    explainDetails: 'RAM comes in types (DDR4, DDR5),your motherboard must support the right type. Usually 2 or 4 slots.',
    buildOrder: 4,
  },
  {
    id: 'storage',
    name: 'Storage',
    emoji: '💾',
    whatItDoes: 'Long-term memory. Where your files, games, and apps live forever.',
    whatHappensWithout: 'You\'d have nowhere to save anything!',
    funAnalogy: 'Storage is like a filing cabinet. SSD = fast cabinet. HDD = older, slower cabinet.',
    whyItMatters: 'SSDs are faster than HDDs. Bigger storage = more games and files!',
    explainMore: 'Storage can be SSD (fast, no moving parts) or HDD (older, slower, cheaper). Both store data permanently.',
    explainDetails: 'SSDs plug into M.2 slots or use SATA cables. The PSU has special cables for storage power.',
    buildOrder: 5,
  },
  {
    id: 'gpu',
    name: 'GPU',
    emoji: '🎮',
    whatItDoes: 'The artist for your screen! Handles graphics, games, and everything you see.',
    whatHappensWithout: 'You\'d have no display,or very basic graphics. Some CPUs have built-in graphics.',
    funAnalogy: 'The GPU is like a painter. It draws every pixel you see on your screen.',
    whyItMatters: 'A good GPU = smooth games and crisp videos.',
    explainMore: 'GPU means Graphics Processing Unit. It renders images, videos, and games.',
    explainDetails: 'GPUs plug into the PCIe slot,the long one on the motherboard. They need power cables from the PSU.',
    buildOrder: 6,
  },
  {
    id: 'psu',
    name: 'Power Supply',
    emoji: '⚡',
    whatItDoes: 'Gives power to your whole PC. Like plugging in a lamp!',
    whatHappensWithout: 'Nothing would turn on. Zero. Zip. Nada.',
    funAnalogy: 'The PSU is like the power outlet for your whole PC,it feeds everyone.',
    whyItMatters: 'Without it, nothing turns on. It needs enough wattage for your parts.',
    explainMore: 'The PSU converts wall power into the right voltages for each component.',
    explainDetails: 'Wattage matters! Add up CPU + GPU needs, then add 20% extra. Modular PSUs let you plug only the cables you need.',
    buildOrder: 7,
  },
  {
    id: 'case',
    name: 'Case',
    emoji: '📦',
    whatItDoes: 'The home for everything! Keeps your parts safe and organized.',
    whatHappensWithout: 'Your parts would be exposed,dust, bumps, and no airflow!',
    funAnalogy: 'The case is like a house. It keeps everything safe and has windows (fans) for airflow.',
    whyItMatters: 'A good case has airflow and room for all your parts.',
    explainMore: 'The case holds all components, provides airflow for cooling, and protects against dust and bumps.',
    explainDetails: 'Case sizes (ATX, Micro-ATX) must fit your motherboard. Big GPUs need a case with enough room.',
    buildOrder: 0,
  },
  {
    id: 'cables',
    name: 'Cables',
    emoji: '🔗',
    whatItDoes: 'Connect everything together! Power cables, data cables, and more.',
    whatHappensWithout: 'Your parts would be installed but not connected,nothing would work!',
    funAnalogy: 'Cables are like the nerves and blood vessels,they carry power and data between parts.',
    whyItMatters: 'Parts need cables to get power and talk to each other.',
    explainMore: 'Cables include power cables from the PSU, SATA/data cables for storage, and front panel connectors.',
    explainDetails: 'Main connections: 24-pin to motherboard, 8-pin to CPU, 6+2 pin to GPU, SATA to storage.',
    buildOrder: 8,
  },
]

/** Build order for the interactive build */
export const BUILD_ORDER = ['motherboard', 'cpu', 'cpu-cooler', 'ram', 'storage', 'gpu', 'psu', 'cables']

/** Drop zone IDs - maps parts to where they go */
export const DROP_ZONES = {
  motherboard: 'case-main',
  cpu: 'motherboard-slot',
  'cpu-cooler': 'cpu-top',
  ram: 'motherboard-ram',
  storage: 'case-storage',
  gpu: 'motherboard-pcie',
  psu: 'case-psu',
  cables: 'case-cables',
}

/** Parts that have their own learning page (exclude case, cables) */
export const LEARNING_PARTS = PARTS.filter((p) => p.id !== 'case' && p.id !== 'cables')
