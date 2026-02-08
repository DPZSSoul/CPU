/**
 * Interactive Build - main game mode
 * Drag parts into correct slots in order. Visual Cable Mode for step 8.
 */

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'
import { BUILD_ORDER, PARTS, DROP_ZONES } from '../data/partsData'
import { playSuccess, playWrong } from '../utils/sounds'
import { DRAG_ACTIVATION_DISTANCE } from '../utils/touch'
import { fireConfetti, fireCompleteConfetti } from '../utils/confetti'
import VisualCableMode from './VisualCableMode'

/** Gentle hints when user drops part in wrong place */
const HINTS = {
  motherboard: "The motherboard goes in the main area of the case first,it's the big flat board!",
  cpu: "The CPU lives on the motherboard, not in the case by itself 😊",
  'cpu-cooler': "The CPU cooler sits right on top of the CPU to keep it cool!",
  ram: "RAM sticks go into the special slots on the motherboard,look for the long clips.",
  storage: "Storage drives go in the drive bays,usually near the front of the case.",
  gpu: "The GPU plugs into the PCIe slot on the motherboard,the long slot!",
  psu: "The power supply goes in its own compartment, usually at the bottom.",
  cables: "Cables connect everything,plug them in last after all parts are in place!",
}

/**
 * Draggable part card - used in sidebar and as overlay while dragging
 */
function DraggablePart({ part, isDragging }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: part.id,
  })

  return (
    <motion.div
      ref={setNodeRef}
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center gap-3 px-5 py-4 rounded-2xl
        bg-white border-2 border-slate-200 shadow-game
        cursor-grab active:cursor-grabbing touch-none tap-target
        transition-all duration-200
        ${isDragging ? 'opacity-50 scale-95 shadow-lg' : 'hover:border-pc-blue hover:shadow-game-hover hover:scale-[1.02]'}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-blue
      `}
      {...listeners}
      {...attributes}
      tabIndex={0}
      role="button"
      aria-label={`Drag ${part.name} to place it`}
    >
      <span className="text-3xl">{part.emoji}</span>
      <span className="font-bold text-slate-800">{part.name}</span>
    </motion.div>
  )
}

/**
 * Drop zone - highlights when hovering over correct area
 */
function DropZone({ zoneId, partId, placed, isActive, isOver, children }) {
  const { setNodeRef } = useDroppable({
    id: zoneId,
    data: { accepts: partId },
  })

  return (
    <motion.div
      ref={setNodeRef}
      layout
      animate={{
        scale: isOver && isActive ? 1.02 : 1,
        borderColor: placed ? 'rgb(52, 211, 153)' : isOver && isActive ? 'rgb(59, 130, 246)' : undefined,
        backgroundColor: placed ? 'rgba(52, 211, 153, 0.2)' : isOver && isActive ? 'rgba(59, 130, 246, 0.2)' : undefined,
      }}
      transition={{ duration: 0.2 }}
      className={`
        rounded-xl border-2 border-dashed min-h-[60px] flex items-center justify-center
        ${placed ? 'border-pc-mint' : ''}
        ${isActive && !placed ? 'border-pc-blue bg-pc-blue/10' : ''}
        ${!isActive && !placed ? 'bg-slate-100 border-slate-200' : ''}
      `}
    >
      {placed ? (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-2xl"
        >
          ✓ {children}
        </motion.span>
      ) : (
        children
      )}
    </motion.div>
  )
}

/**
 * PCCase - needs isOver state per zone, so we use a wrapper
 */
function PCCase({ placedParts, currentPartIndex, overId }) {
  const nextPartId = BUILD_ORDER[currentPartIndex]
  const hasMotherboard = placedParts.includes('motherboard')
  const hasAllPartsExceptCables = placedParts.length === BUILD_ORDER.length - 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-b from-slate-200 to-slate-300 rounded-2xl p-5 sm:p-8 border-4 border-slate-400/50 shadow-xl"
    >
      <div className="text-center mb-4 font-bold text-slate-600 text-lg">Your PC Case</div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DropZone
            zoneId="case-psu"
            partId="psu"
            placed={placedParts.includes('psu')}
            isActive={nextPartId === 'psu'}
            isOver={overId === 'case-psu'}
          >
            {placedParts.includes('psu') ? '⚡ PSU' : '⚡ PSU here'}
          </DropZone>
          <div className="sm:col-span-2">
            <DropZone
              zoneId="case-main"
              partId="motherboard"
              placed={placedParts.includes('motherboard')}
              isActive={nextPartId === 'motherboard'}
              isOver={overId === 'case-main'}
            >
              {placedParts.includes('motherboard') ? '🔌 Motherboard' : '🔌 Motherboard here'}
            </DropZone>
          </div>
        </div>

        {hasMotherboard && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <DropZone
              zoneId="motherboard-slot"
              partId="cpu"
              placed={placedParts.includes('cpu')}
              isActive={nextPartId === 'cpu'}
              isOver={overId === 'motherboard-slot'}
            >
              {placedParts.includes('cpu') ? '🧠 CPU' : '🧠 CPU slot'}
            </DropZone>
            <DropZone
              zoneId="cpu-top"
              partId="cpu-cooler"
              placed={placedParts.includes('cpu-cooler')}
              isActive={nextPartId === 'cpu-cooler'}
              isOver={overId === 'cpu-top'}
            >
              {placedParts.includes('cpu-cooler') ? '❄️ Cooler' : '❄️ Cooler'}
            </DropZone>
            <DropZone
              zoneId="motherboard-ram"
              partId="ram"
              placed={placedParts.includes('ram')}
              isActive={nextPartId === 'ram'}
              isOver={overId === 'motherboard-ram'}
            >
              {placedParts.includes('ram') ? '📋 RAM' : '📋 RAM slots'}
            </DropZone>
            <DropZone
              zoneId="motherboard-pcie"
              partId="gpu"
              placed={placedParts.includes('gpu')}
              isActive={nextPartId === 'gpu'}
              isOver={overId === 'motherboard-pcie'}
            >
              {placedParts.includes('gpu') ? '🎮 GPU' : '🎮 GPU slot'}
            </DropZone>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DropZone
            zoneId="case-storage"
            partId="storage"
            placed={placedParts.includes('storage')}
            isActive={nextPartId === 'storage'}
            isOver={overId === 'case-storage'}
          >
            {placedParts.includes('storage') ? '💾 Storage' : '💾 Storage bay'}
          </DropZone>
          <DropZone
            zoneId="case-cables"
            partId="cables"
            placed={placedParts.includes('cables')}
            isActive={nextPartId === 'cables'}
            isOver={overId === 'case-cables'}
          >
            {placedParts.includes('cables') ? (
              <span className="flex items-center gap-2">
                ✓ Cables
                {hasAllPartsExceptCables && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-slate-500"
                  >
                    (snap into ports!)
                  </motion.span>
                )}
              </span>
            ) : (
              '🔗 Connect cables'
            )}
          </DropZone>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Main interactive build component
 */
export default function InteractiveBuild({ learningMode, onComplete }) {
  const [placedParts, setPlacedParts] = useState([])
  const [hint, setHint] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [overId, setOverId] = useState(null)

  const currentPartIndex = placedParts.length
  const nextPartId = BUILD_ORDER[currentPartIndex]
  const nextPart = nextPartId ? PARTS.find((p) => p.id === nextPartId) : null
  const isComplete = placedParts.length === BUILD_ORDER.length
  const isCablePhase = nextPartId === 'cables'

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: DRAG_ACTIVATION_DISTANCE } }),
    useSensor(KeyboardSensor)
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
    setHint(null)
    setSuccessMessage(null)
  }

  const handleDragOver = (event) => {
    setOverId(event?.over?.id ?? null)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)
    setOverId(null)

    if (!over) return

    const expectedPartId = BUILD_ORDER[currentPartIndex]
    const droppedZoneId = over.id
    const correctZoneId = DROP_ZONES[expectedPartId]

    if (droppedZoneId === correctZoneId && active.id === expectedPartId) {
      setPlacedParts((prev) => [...prev, expectedPartId])
      const isCables = expectedPartId === 'cables'
      setSuccessMessage(
        isCables
          ? "Cables connected! Power flows to everything ⚡→🔌→🧠→🎮"
          : `Perfect! ${nextPart?.name} is in place! 🎉`
      )
      setHint(null)

      playSuccess()
      fireConfetti()

      setTimeout(() => setSuccessMessage(null), isCables ? 2500 : 2000)

      if (placedParts.length + 1 === BUILD_ORDER.length) {
        fireCompleteConfetti()
        setTimeout(() => onComplete(), 2500)
      }
    } else {
      setHint(HINTS[expectedPartId] || "Almost! Try dragging it to the highlighted spot.")
      setSuccessMessage(null)
      playWrong()
    }
  }

  // Visual Cable Mode - drag cables into ports (step 8)
  if (isCablePhase) {
    return (
      <div className="max-w-4xl mx-auto">
        <VisualCableMode
          onComplete={() => {
            setPlacedParts((prev) => [...prev, 'cables'])
            onComplete()
          }}
        />
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        <div className="flex-1">
          <PCCase placedParts={placedParts} currentPartIndex={currentPartIndex} overId={overId} />
        </div>

        <div className="lg:w-80 space-y-5 min-w-0">
          <h2 className="text-xl font-bold text-slate-800">Parts to place</h2>

          <div className="space-y-3">
            {nextPart && !isComplete ? (
              <DraggablePart part={nextPart} isDragging={activeId === nextPart.id} />
            ) : isComplete ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-4 py-3 rounded-xl bg-pc-mint/30 border-2 border-pc-mint text-center font-bold text-pc-teal"
              >
                All done! 🎉
              </motion.div>
            ) : null}
          </div>

          <AnimatePresence mode="wait">
            {successMessage && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mt-4 p-4 rounded-2xl bg-pc-mint/30 border-2 border-pc-mint text-pc-teal font-medium animate-glow-pulse shadow-lg"
                role="status"
              >
                {successMessage}
              </motion.div>
            )}
            {hint && !successMessage && (
              <motion.div
                key="hint"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-800"
                role="alert"
              >
                💡 {hint}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="mt-6" layout>
            <p className="text-sm text-slate-500 mb-2">
              Progress: {placedParts.length} / {BUILD_ORDER.length} parts
            </p>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pc-blue to-pc-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(placedParts.length / BUILD_ORDER.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border-2 border-pc-blue shadow-2xl"
          >
            <span className="text-3xl">{PARTS.find((p) => p.id === activeId)?.emoji}</span>
            <span className="font-bold text-slate-800">{PARTS.find((p) => p.id === activeId)?.name}</span>
          </motion.div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
