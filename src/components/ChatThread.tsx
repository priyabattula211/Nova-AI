import { motion } from 'framer-motion'
import { AlertCircle, Brain } from 'lucide-react'
import type { ChatMessage } from '../types/chat'

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-sm text-white/52"
    >
      <span className="grid size-8 place-items-center rounded-full bg-white/[0.06] text-cyan-100">
        <Brain size={15} />
      </span>
      <span>Nova is thinking</span>
      <span className="flex gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="size-1 rounded-full bg-cyan-200/70"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: dot * 0.16 }}
          />
        ))}
      </span>
    </motion.div>
  )
}

export function ChatThread({
  messages,
  isSending,
  error,
}: {
  messages: ChatMessage[]
  isSending: boolean
  error: string | null
}) {
  return (
    <section className="flex flex-1 flex-col gap-4 px-4 pb-6 pt-6">
      {messages.map((message, index) => {
        const isUser = message.role === 'user'

        return (
          <motion.article
            key={message.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.03 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[84%] whitespace-pre-wrap rounded-[1.35rem] px-4 py-3 text-[0.98rem] leading-6 shadow-[0_18px_42px_rgba(0,0,0,0.32)] ${
                isUser
                  ? 'bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 text-white'
                  : 'border border-white/10 bg-white/[0.07] text-white/86 backdrop-blur-xl'
              }`}
            >
              {message.content}
            </div>
          </motion.article>
        )
      })}

      {isSending && <TypingIndicator />}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"
        >
          <AlertCircle size={17} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
    </section>
  )
}
