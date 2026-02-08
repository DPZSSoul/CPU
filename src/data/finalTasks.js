/**
 * Final tasks - end-to-end PC build mastery verification
 */

export const FINAL_TASKS = [
  {
    id: 'task1',
    type: 'build_order',
    title: 'Build Order Challenge',
    desc: 'Drag the steps into the correct order for building a PC from scratch.',
    steps: [
      { id: 's1', text: 'Install CPU and cooler on motherboard', order: 1 },
      { id: 's2', text: 'Install RAM in correct slots', order: 2 },
      { id: 's3', text: 'Mount motherboard in case with standoffs', order: 3 },
      { id: 's4', text: 'Install PSU and route cables', order: 4 },
      { id: 's5', text: 'Connect 24-pin and 8-pin CPU power', order: 5 },
      { id: 's6', text: 'Install storage (M.2 or SATA)', order: 6 },
      { id: 's7', text: 'Install GPU in PCIe slot', order: 7 },
      { id: 's8', text: 'Connect front panel (PWR_SW, LED)', order: 8 },
      { id: 's9', text: 'First boot - enter BIOS', order: 9 },
    ],
  },
  {
    id: 'task2',
    type: 'diagnosis_chain',
    title: 'Full Diagnosis Flow',
    desc: 'A PC will not POST. Select the checks in the order a technician would perform them.',
    checks: [
      { id: 'c1', text: 'Verify PSU is switched ON and power cable connected', order: 1 },
      { id: 'c2', text: 'Reseat RAM, try one stick at a time', order: 2 },
      { id: 'c3', text: 'Verify 8-pin CPU power is connected', order: 3 },
      { id: 'c4', text: 'Try integrated graphics (remove GPU, plug into motherboard)', order: 4 },
      { id: 'c5', text: 'Check front panel connector (PWR_SW)', order: 5 },
      { id: 'c6', text: 'Paperclip test the PSU', order: 6 },
    ],
  },
];
