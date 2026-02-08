/**
 * Visual Cable Mode - step 8 of the build
 * User drags 4 power cables (motherboard, CPU, GPU, storage) to their ports.
 * Concept-level only - no connector realism.
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
import { CABLE_CONNECTIONS, CABLE_HINTS } from '../data/cableData'
import { playSuccess, playWrong } from '../utils/sounds'
import { DRAG_ACTIVATION_DISTANCE } from '../utils/touch'
import { fireConfetti, fireCompleteConfetti } from '../utils/confetti'

function DraggableCable({ cable, isDragging }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: cable.id })

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center gap-3 px-5 py-4 rounded-2xl
        bg-white border-2 border-amber-400 shadow-game
        cursor-grab active:cursor-grabbing touch-none tap-target
        ${isDragging ? 'opacity-50' : 'hover:border-amber-500 hover:shadow-game-hover hover:scale-[1.02]'}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
      `}
      tabIndex={0}
      role="button"
      aria-label={`Drag ${cable.label} to connect`}
    >
      <span className="text-2xl">🔗</span>
      <span className="font-bold text-slate-800">{cable.label}</span>
    </motion.div>
  )
}

function CablePort({ portId, cableId, placed, isActive, isOver, children }) {
  const { setNodeRef } = useDroppable({ id: portId, data: { accepts: cableId } })

  return (
    <motion.div
      ref={setNodeRef}
      animate={{
        scale: isOver && isActive ? 1.03 : 1,
        borderColor: placed ? 'rgb(52, 211, 153)' : isOver && isActive ? 'rgb(245, 158, 11)' : undefined,
        backgroundColor: placed ? 'rgba(52, 211, 153, 0.2)' : isOver && isActive ? 'rgba(245, 158, 11, 0.15)' : undefined,
      }}
      transition={{ duration: 0.2 }}
      className={`
        rounded-xl border-2 border-dashed min-h-[70px] flex items-center justify-center
        transition-colors
        ${placed ? 'border-pc-mint bg-pc-mint/20' : ''}
        ${isActive && !placed ? 'border-amber-400 bg-amber-50' : ''}
        ${!isActive && !placed ? 'bg-slate-100 border-slate-200' : ''}
      `}
    >
      {placed ? (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-lg font-medium text-pc-teal"
        >
          ✓ {children}
        </motion.span>
      ) : (
        <span className="text-slate-600 text-center text-sm">{children}</span>
      )}
    </motion.div>
  )
}

export default function VisualCableMode({ onComplete }) {
  const [connectedCables, setConnectedCables] = useState([])
  const [hint, setHint] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [overId, setOverId] = useState(null)

  const nextCable = CABLE_CONNECTIONS.find((c) => !connectedCables.includes(c.id))
  const isComplete = connectedCables.length === CABLE_CONNECTIONS.length

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: DRAG_ACTIVATION_DISTANCE } }),
    useSensor(KeyboardSensor)
  )

  const handleDragStart = (e) => {
    setActiveId(e.active.id)
    setHint(null)
  }

  const handleDragOver = (e) => {
    setOverId(e?.over?.id ?? null)
  }

  const handleDragEnd = (e) => {
    const { active, over } = e
    setActiveId(null)
    setOverId(null)
    if (!over) return

    const expectedCable = nextCable
    const droppedPortId = over.id
    const correctPortId = expectedCable?.portId

    if (droppedPortId === correctPortId && active.id === expectedCable?.id) {
      setConnectedCables((prev) => [...prev, expectedCable.id])
      playSuccess()
      fireConfetti()

      if (connectedCables.length + 1 === CABLE_CONNECTIONS.length) {
        fireCompleteConfetti()
        setTimeout(() => onComplete(), 2000)
      }
    } else {
      setHint(CABLE_HINTS[expectedCable?.id] || "Almost! Try the highlighted port 😊")
      playWrong()
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Connect the cables!</h2>
          <p className="text-slate-600">
            Drag each power cable to its correct port. Power flows from the PSU → each part.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Case with ports */}
          <div className="bg-gradient-to-b from-slate-200 to-slate-300 rounded-2xl p-5 sm:p-6 border-4 border-slate-400/50 shadow-xl">
            <div className="text-center font-bold text-slate-600 mb-4">Your PC – Connect power here</div>
            <div className="grid grid-cols-2 gap-4">
              <CablePort
                portId="port-motherboard"
                cableId="cable-motherboard"
                placed={connectedCables.includes('cable-motherboard')}
                isActive={nextCable?.id === 'cable-motherboard'}
                isOver={overId === 'port-motherboard'}
              >
                Motherboard power
              </CablePort>
              <CablePort
                portId="port-cpu"
                cableId="cable-cpu"
                placed={connectedCables.includes('cable-cpu')}
                isActive={nextCable?.id === 'cable-cpu'}
                isOver={overId === 'port-cpu'}
              >
                CPU power
              </CablePort>
              <CablePort
                portId="port-gpu"
                cableId="cable-gpu"
                placed={connectedCables.includes('cable-gpu')}
                isActive={nextCable?.id === 'cable-gpu'}
                isOver={overId === 'port-gpu'}
              >
                GPU power
              </CablePort>
              <CablePort
                portId="port-storage"
                cableId="cable-storage"
                placed={connectedCables.includes('cable-storage')}
                isActive={nextCable?.id === 'cable-storage'}
                isOver={overId === 'port-storage'}
              >
                Storage power
              </CablePort>
            </div>
          </div>

          {/* Cables to connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Cables to connect</h3>
            <div className="space-y-3">
              {nextCable && !isComplete ? (
                <DraggableCable cable={nextCable} isDragging={activeId === nextCable.id} />
              ) : isComplete ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 rounded-xl bg-pc-mint/30 border-2 border-pc-mint text-center font-bold text-pc-teal"
                >
                  All cables connected! Power flows to everything ⚡
                </motion.div>
              ) : null}
            </div>

            <AnimatePresence>
              {hint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-800"
                  role="alert"
                >
                  💡 {hint}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-4">
              <p className="text-sm text-slate-500 mb-2">
                Cables: {connectedCables.length} / {CABLE_CONNECTIONS.length}
              </p>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-pc-teal rounded-full"
                  animate={{ width: `${(connectedCables.length / CABLE_CONNECTIONS.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <DragOverlay>
        {activeId ? (
          <motion.div
            animate={{ scale: 1.05 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border-2 border-amber-500 shadow-2xl"
          >
            <span className="text-2xl">🔗</span>
            <span className="font-bold text-slate-800">
              {CABLE_CONNECTIONS.find((c) => c.id === activeId)?.label}
            </span>
          </motion.div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
