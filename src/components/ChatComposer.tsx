import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Mic, Paperclip, SlidersHorizontal, Sparkles } from 'lucide-react'

function IconButton({ label, children }: { label: string; children: ReactNode }) {
  return (
    <button
      className="grid size-12 place-items-center rounded-full text-white/68 transition hover:bg-white/[0.06] hover:text-white"
      aria-label={label}
      type="button"
      title={label}
    >
      {children}
    </button>
  )
}

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  isSending,
  error,
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isSending: boolean
  error: string | null
}) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay: 0.45 }}
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[34rem] px-3 pb-3"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      {error && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-2 mb-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-100 backdrop-blur-xl"
        >
          {error}
        </motion.p>
      )}
      <div className="rounded-[2rem] border border-white/10 bg-[#17181d]/90 p-3 shadow-[0_-24px_80px_rgba(0,0,0,0.72),0_0_42px_rgba(59,130,246,0.08)] backdrop-blur-2xl">
        <label className="sr-only" htmlFor="chat-prompt">
          Ask Nova AI
        </label>
        <input
          id="chat-prompt"
          className="h-12 w-full bg-transparent px-3 text-base text-white outline-none placeholder:text-white/38"
          placeholder="Ask Nova AI"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={isSending}
        />

        <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-2">
          <div className="flex items-center gap-2">
            <IconButton label="Attach file">
              <Paperclip size={22} />
            </IconButton>
            <IconButton label="Tune mode">
              <SlidersHorizontal size={22} />
            </IconButton>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="hidden h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white/78 transition hover:border-cyan-300/25 hover:text-white min-[380px]:inline-flex"
              type="button"
            >
              <Sparkles size={16} className="text-cyan-200" />
              Focus
            </button>
            <IconButton label="Voice input">
              <Mic size={22} />
            </IconButton>
            <button
              className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.55)] transition hover:scale-105"
              aria-label="Send message"
              disabled={isSending || !value.trim()}
              type="submit"
            >
              <ArrowUp size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.form>
  )
}
