# Build Your First PC 🖥️

A beginner-friendly, game-like interactive website that teaches how to build a desktop computer from scratch. Similar to a simplified PC Building Simulator—perfect for complete beginners.

## Features

- **Home Screen** – Animated PC illustration, "Start Building" + "Learn the Parts First"
- **Parts Learning** – Per-part mini-pages with large illustration, fun analogy, what happens without it, "Show me where this goes"
- **Interactive Build** – Drag-and-drop with slot highlights, success sounds, confetti, friendly hints
- **Learning Mode Toggle** – Fun Mode (minimal) vs Explain More (CPU sockets, RAM, power, airflow)
- **Visual Cable Mode** – Cables step shows concept-level connection flow
- **Completion** – Celebration animation, confetti, summary cards
- **Compatibility Basics** – Separate mini-lesson (CPU socket, RAM type, PSU wattage, GPU size)

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion (animations)
- @dnd-kit (drag and drop)
- Howler.js (sound effects)
- canvas-confetti (celebration)
- No backend – everything runs in the browser

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
├── data/             # Parts data and build order
├── App.jsx
├── main.jsx
└── index.css
```

## Accessibility

- Simple language throughout
- Clear contrast and large text
- Keyboard navigation (including drag-and-drop via keyboard)
- Focus styles for interactive elements
- Reduced motion support
