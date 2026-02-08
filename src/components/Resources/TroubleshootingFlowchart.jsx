/**
 * Troubleshooting flowchart - decision tree for common problems
 */

import { motion } from 'framer-motion'

const STEPS = [
  { id: 'start', q: 'What\'s the problem?', options: ['PC won\'t turn on', 'No display (fans spin)', 'No boot device', 'Random shutdowns', 'Slow / stuttering'] },
  { id: 'no-power', q: 'PC won\'t turn on', check: ['PSU switch ON?', 'Power cable plugged in?', 'Wall outlet works?', 'Front panel connector (PWR_SW) connected?'], fix: 'Check power path: outlet → cable → PSU switch → front panel. Reseat PWR_SW on motherboard.' },
  { id: 'no-display', q: 'No display (fans spin)', check: ['Monitor in GPU port (not motherboard)?', 'GPU fully seated?', 'Try one RAM stick?', 'CPU power (8-pin) connected?'], fix: 'Most common: monitor in wrong port. Plug into GPU. Reseat RAM. Check 8-pin CPU power.' },
  { id: 'no-boot', q: 'No boot device', check: ['Boot order correct in BIOS?', 'Drive detected in BIOS?', 'M.2/SATA cable seated?'], fix: 'Enter BIOS (Del/F2). Set correct drive as first boot. Reseat storage cables.' },
  { id: 'shutdowns', q: 'Random shutdowns under load', check: ['CPU/GPU temps OK? (HWiNFO)', 'PSU wattage enough?', 'Cooler plastic removed?'], fix: 'Thermal or PSU. Improve cooling. Use PCPartPicker for wattage. Check cooler mounting.' },
  { id: 'slow', q: 'Slow or stuttering', check: ['OS on SSD or HDD?', 'RAM usage maxed?', 'Disk at 100%?'], fix: 'OS on HDD = slow. Migrate to SSD. Add RAM if maxed. Check thermal throttling.' },
]

export default function TroubleshootingFlowchart() {
  return (
    <div className=" space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Troubleshooting flowchart</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
          Follow the steps for your symptom. Check easiest things first.
        </p>
      </div>

      <div className="space-y-4">
        {STEPS.filter((s) => s.id !== 'start').map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
          >
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">{step.q}</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Check:</p>
            <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1 mb-4">
              {step.check?.map((c, j) => (
                <li key={j}>{c}</li>
              ))}
            </ul>
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Fix:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">{step.fix}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
