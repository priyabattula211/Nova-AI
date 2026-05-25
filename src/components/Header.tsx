import { motion } from 'framer-motion'
import { Brain, Menu } from 'lucide-react'
import type { UserSession } from '../types/user'

const getInitials = (name?: string | null) =>
  name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'AI'

export function Header({ user }: { user: UserSession | null }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="sticky top-0 z-30 flex h-20 items-center justify-between px-5 pt-2 backdrop-blur-2xl"
    >
      <button
        className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 shadow-[0_0_28px_rgba(76,201,240,0.08)] transition hover:scale-105 hover:border-cyan-300/30 hover:text-white"
        aria-label="Open navigation"
        type="button"
      >
        <Menu size={22} strokeWidth={2.2} />
      </button>

      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#8ff8ff,#8b5cf6_52%,#111827)] shadow-[0_0_34px_rgba(139,92,246,0.55)]">
          <Brain size={17} className="text-white" />
        </span>
        <span className="text-[1.35rem] font-semibold tracking-[0] text-white">Nova AI</span>
      </div>

      <button
        className="relative grid size-12 place-items-center overflow-hidden rounded-full border border-white/15 bg-white/[0.06] text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.18)]"
        aria-label="Open profile"
        type="button"
      >
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="size-full object-cover" />
        ) : (
          <span>{getInitials(user?.name)}</span>
        )}
      </button>
    </motion.header>
  )
}
