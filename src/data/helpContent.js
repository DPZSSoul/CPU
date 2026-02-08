/**
 * Contextual help content - pre-written for each topic
 * Simulates AI-style explanations: simple, different angle, example
 * Replace with real AI API later if desired
 */

export const HELP_CONTENT = {
  'learn-cpu': {
    simple: "The CPU is the brain of your computer. It runs every program by executing millions of tiny instructions per second. Think of it like a chef following recipes,it reads instructions (from RAM), does the work, and writes results back.",
    different: "Instead of 'brain,' think of the CPU as the factory floor. Raw materials (data) come in, workers (cores) process them, and finished products (results) go out. More workers (cores) help when you have many tasks. Faster workers (clock speed) help when each task is complex.",
    example: "When you open Chrome: the CPU loads the program from storage into RAM, then executes its code line by line. When you click a link, the CPU processes that click, tells the GPU to render the new page, and coordinates with the network hardware. A slow CPU makes this feel laggy.",
  },
  'learn-motherboard': {
    simple: "The motherboard is the main circuit board that connects everything. It's like a city's road system,data and power travel along its traces to reach the CPU, RAM, GPU, and storage.",
    different: "The motherboard doesn't 'think' or 'store',it routes. It provides the physical connections (slots, sockets) and the chipset that extends the CPU's connectivity. Without it, components couldn't talk to each other.",
    example: "When you plug in a USB drive, the motherboard's USB controller receives the connection, routes data to the chipset, which hands it to the CPU. The CPU then tells the storage driver to read the drive. The motherboard enabled that entire path.",
  },
  'learn-ram': {
    simple: "RAM is your PC's short-term memory. It holds data the CPU is actively using. When you open a program, it loads from storage into RAM so the CPU can access it quickly. RAM is erased when power is off.",
    different: "RAM is volatile,it needs power to remember. Storage is non-volatile. The CPU doesn't talk to storage directly during program execution; it fetches from RAM. Slow or insufficient RAM forces the CPU to wait or use the slow page file on storage.",
    example: "With 8GB RAM and 20 Chrome tabs: RAM fills up. The OS moves old tab data to the page file on your SSD. When you switch back to that tab, the CPU has to fetch from slow storage instead of fast RAM,that's the lag you feel.",
  },
  'learn-gpu': {
    simple: "The GPU draws everything you see on screen. It's specialized for parallel math,perfect for rendering millions of pixels. Games and video editing push it hard.",
    different: "CPUs are good at sequential, complex logic. GPUs excel at running the same simple operation millions of times in parallel. Rendering a frame means running shaders on every pixel,that's a GPU job.",
    example: "In a game: the CPU prepares the scene (physics, AI, draw calls). The GPU receives draw calls and renders each object. A slow GPU can't keep up,you get low fps. A slow CPU can't feed the GPU fast enough,you get CPU bottleneck.",
  },
  'learn-psu': {
    simple: "The PSU converts wall power (AC) to the voltages your PC needs (DC). It feeds every component. A bad or undersized PSU can cause crashes, instability, or even damage.",
    different: "The PSU doesn't just pass through power,it converts and regulates. Different components need different voltages: 12V for CPU/GPU, 5V and 3.3V for drives and board. Insufficient wattage under load causes voltage drops and shutdowns.",
    example: "Gaming PC with 500W PSU and RTX 4070: the GPU alone can pull 200W. Add CPU (100W+), board, drives,you're over 400W. Under heavy load, transients spike higher. The PSU cuts out to protect itself. Result: random shutdowns during games.",
  },
  'learn-storage': {
    simple: "Storage holds your files permanently. HDDs use spinning disks. SSDs use flash memory,no moving parts, much faster. NVMe SSDs use the PCIe bus for maximum speed.",
    different: "Boot speed and load times come from storage. A fast CPU with a slow HDD still feels sluggish at startup. The OS, page file, and game assets all live here. Upgrading to SSD is often the biggest perceived speed gain.",
    example: "Windows on HDD: 2–3 minute boot. Windows on NVMe: 15–30 seconds. Game loading: HDD may take minutes; NVMe loads in seconds. The CPU spends a lot of time waiting on storage,faster storage means less waiting.",
  },
  'learn-cooling': {
    simple: "Cooling removes heat. CPUs and GPUs generate heat when working. Without cooling, they throttle (slow down) or shut off to prevent damage. Good airflow keeps temps safe.",
    different: "Heat sinks conduct heat away from the chip. Fans move air to carry that heat out. Thermal paste fills microscopic gaps between chip and cooler. Poor contact or clogged fins mean heat stays in,throttling or shutdown.",
    example: "CPU cooler with plastic left on: heat can't transfer to the cooler. CPU hits 100°C in seconds. System thermal throttles or shuts down. Removing the plastic and applying paste fixes it. This is a very common first-build mistake.",
  },
  'learn-case': {
    simple: "The case holds everything together and provides airflow. A good case has room for parts, proper fan mounting, and cable management. Poor airflow leads to overheating.",
    different: "Case choice affects thermals and noise. Mesh front = more airflow. Solid front = restricted. Negative pressure (more exhaust than intake) pulls dust in through gaps. Cable management affects airflow through the case.",
    example: "Small case with large GPU: the GPU may not fit, or it blocks airflow. No front intake fans: components run hot. Adding two intake fans at the front can drop temps 10–15°C. Case design matters.",
  },
  'diagnose': {
    simple: "Start with the easiest checks: power cable, PSU switch, monitor cable port. Then work through elimination,one variable at a time. Don't assume. Test.",
    different: "Troubleshooting is hypothesis testing. You have symptoms. You form hypotheses (could be X, Y, or Z). You test each one. A check that rules out X narrows the possibilities. Systematic elimination beats guessing.",
    example: "No display: hypothesis 1 = wrong cable port. Check: plug into GPU. If that fixes it, done. If not, hypothesis 2 = RAM. Reseat RAM, try one stick. Continue until you find the cause. Document what you tried.",
  },
  'quiz': {
    simple: "Quizzes test your understanding. Wrong answers come with explanations,use them to learn. You can retake quizzes to improve. Focus on understanding why, not just memorizing.",
    different: "The goal isn't a perfect score on the first try. It's building correct mental models. When you get something wrong, the explanation corrects your model. Retaking helps reinforce. Real learning involves mistakes.",
    example: "You pick 'GPU' for black screen. Wrong,it was the cable port. The explanation says: 'Check easiest first.' Next time you'll think 'cable port' before 'dead GPU.' That's the learning.",
  },
  'build': {
    simple: "Match CPU socket to motherboard. Match RAM type (DDR4/DDR5) to board. Ensure PSU has enough wattage for CPU + GPU + headroom. Check GPU fits in case.",
    different: "Compatibility is a constraint satisfaction problem. Each choice limits others. Pick a CPU first,that determines socket and thus motherboard. Board determines RAM type. Add up power draw and size up the PSU.",
    example: "You pick Ryzen 5 5600 (AM4) and a B650 board (AM5). Incompatible,different sockets. You pick RTX 4070 and 450W PSU. Under load, the system will shut down. PCPartPicker helps catch these.",
  },
  'thinking': {
    simple: "Technician thinking is about process: check the easiest thing first, eliminate causes one by one, and never assume. A symptom (like black screen) has many possible causes.",
    different: "Don't jump to conclusions. Black screen could be cable, RAM, CPU, GPU, or board. The goal is to narrow it down systematically. Each test that rules something out gets you closer.",
    example: "No display: Step 1,Is the cable in the right port? (easiest, free). Step 2,Reseat RAM. Step 3,Try integrated graphics. Step 4,Swap GPU. You might solve it at step 1. No need to replace the GPU first.",
  },
  'default': {
    simple: "You're learning about PCs! Take your time. Use the Beginner/Professional toggle to adjust the depth of explanations. The help button on each page can explain the current topic in different ways.",
    different: "This platform teaches by doing. Read the content, practice diagnostics, take quizzes. Progress is saved. Revisit topics you find hard. There's no rush,deep understanding beats speed.",
    example: "Start with Learn the Parts to build foundations. Then try the Diagnose Simulator to apply that knowledge. Quizzes reinforce. The Progress Dashboard shows where you stand.",
  },
}

export function getHelpForTopic(topicId) {
  return HELP_CONTENT[topicId] || HELP_CONTENT.default
}
