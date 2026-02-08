/** Budget build examples - real part suggestions at different price points */

export const BUDGET_BUILDS = [
  {
    name: '$500 Starter',
    budget: 500,
    use: 'Web, Office, light gaming',
    parts: [
      { name: 'CPU', pick: 'AMD Ryzen 5 5600 or Intel i3-12100F' },
      { name: 'Motherboard', pick: 'B550 (AMD) or B660 (Intel)' },
      { name: 'RAM', pick: '16GB DDR4-3200' },
      { name: 'GPU', pick: 'Integrated or used GTX 1650' },
      { name: 'Storage', pick: '500GB NVMe SSD' },
      { name: 'PSU', pick: '550W 80+ Bronze' },
      { name: 'Case', pick: 'Budget ATX with mesh front' },
    ],
    notes: '1080p low-med settings. Add GPU later for better gaming.',
  },
  {
    name: '$800 Sweet Spot',
    budget: 800,
    use: '1080p gaming, multitasking',
    parts: [
      { name: 'CPU', pick: 'AMD Ryzen 5 5600 or Intel i5-12400F' },
      { name: 'Motherboard', pick: 'B550/B650 or B660' },
      { name: 'RAM', pick: '16GB DDR4-3600 or DDR5-5600' },
      { name: 'GPU', pick: 'RX 6600 or RTX 3060' },
      { name: 'Storage', pick: '1TB NVMe SSD' },
      { name: 'PSU', pick: '650W 80+ Bronze' },
      { name: 'Case', pick: 'Mid-tower with good airflow' },
    ],
    notes: 'Smooth 1080p, some 1440p. Check PCPartPicker for current prices.',
  },
  {
    name: '$1200 Performance',
    budget: 1200,
    use: '1440p gaming, content creation',
    parts: [
      { name: 'CPU', pick: 'AMD Ryzen 5 7600 or Intel i5-13400F' },
      { name: 'Motherboard', pick: 'B650 or B760' },
      { name: 'RAM', pick: '32GB DDR5-5600' },
      { name: 'GPU', pick: 'RX 6700 XT or RTX 4060 Ti' },
      { name: 'Storage', pick: '1TB NVMe Gen4 SSD' },
      { name: 'PSU', pick: '750W 80+ Gold' },
      { name: 'Case', pick: 'Quality mid-tower' },
    ],
    notes: 'Great 1440p. Sales and used gear can push this further.',
  },
  {
    name: '$1800 High-end',
    budget: 1800,
    use: '4K gaming, streaming, video editing',
    parts: [
      { name: 'CPU', pick: 'AMD Ryzen 7 7700X or Intel i5-14600K' },
      { name: 'Motherboard', pick: 'B650 or B760 (or X670/Z790)' },
      { name: 'RAM', pick: '32GB DDR5-6000' },
      { name: 'GPU', pick: 'RTX 4070 or RX 7800 XT' },
      { name: 'Storage', pick: '2TB NVMe Gen4 SSD' },
      { name: 'PSU', pick: '850W 80+ Gold' },
      { name: 'Case', pick: 'Premium mid-tower with good airflow' },
    ],
    notes: '4K-capable. Stream and edit without compromise.',
  },
]
