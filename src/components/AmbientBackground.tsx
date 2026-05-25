import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function AmbientBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: `${8 + ((index * 23) % 86)}%`,
        top: `${8 + ((index * 31) % 78)}%`,
        delay: index * 0.36,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/24 blur-[90px]" />
      <div className="absolute right-[-7rem] top-40 h-64 w-64 rounded-full bg-cyan-400/14 blur-[95px]" />
      <div className="absolute bottom-12 left-[-6rem] h-72 w-72 rounded-full bg-blue-600/13 blur-[100px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_36%),linear-gradient(180deg,transparent,rgba(0,0,0,0.92)_86%)]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute size-1 rounded-full bg-cyan-100/35 shadow-[0_0_14px_rgba(103,232,249,0.75)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0.15, 0.65, 0.15], y: [0, -16, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
