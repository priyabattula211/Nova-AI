import { motion } from 'framer-motion'
import { BookOpen, ImagePlus, Music2, PenLine, SunMedium } from 'lucide-react'

type ActionCard = {
  title: string
  icon: typeof ImagePlus
  glow: string
  prompt: string
}

const actions: ActionCard[] = [
  {
    title: 'Create Image',
    icon: ImagePlus,
    glow: 'from-fuchsia-500/35 to-cyan-400/20',
    prompt: 'Help me craft a detailed image prompt for a futuristic concept.',
  },
  {
    title: 'Create Music',
    icon: Music2,
    glow: 'from-cyan-400/30 to-blue-500/20',
    prompt: 'Help me create a music concept with mood, genre, instruments, and lyrics direction.',
  },
  {
    title: 'Boost My Day',
    icon: SunMedium,
    glow: 'from-violet-400/35 to-fuchsia-500/20',
    prompt: 'Give me a focused plan to make today productive, calm, and energizing.',
  },
  {
    title: 'Help Me Learn',
    icon: BookOpen,
    glow: 'from-blue-400/35 to-cyan-300/20',
    prompt: 'Teach me something useful in a simple step-by-step way.',
  },
  {
    title: 'Write Anything',
    icon: PenLine,
    glow: 'from-purple-500/35 to-blue-400/20',
    prompt: 'Help me write a polished piece of text. Ask what type of writing I need.',
  },
]

function FeatureCard({
  action,
  index,
  onSelectPrompt,
  disabled,
}: {
  action: ActionCard
  index: number
  onSelectPrompt: (prompt: string) => void
  disabled?: boolean
}) {
  const Icon = action.icon

  return (
    <motion.button
      initial={{ opacity: 0, x: -18, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      whileHover={{ scale: 1.035, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 + index * 0.06 }}
      className="group relative flex w-fit min-w-[12.5rem] items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.07] px-4 py-3.5 text-left text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_44px_rgba(0,0,0,0.35)] backdrop-blur-xl transition"
      disabled={disabled}
      onClick={() => onSelectPrompt(action.prompt)}
      type="button"
    >
      <span
        className={`absolute inset-0 bg-gradient-to-r ${action.glow} opacity-0 blur-xl transition duration-500 group-hover:opacity-100`}
      />
      <span className="relative grid size-9 place-items-center rounded-full border border-white/10 bg-black/25 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
        <Icon size={18} />
      </span>
      <span className="relative pr-2 text-[1.04rem] font-medium tracking-[0]">{action.title}</span>
    </motion.button>
  )
}

export function FeatureActions({
  onSelectPrompt,
  disabled,
}: {
  onSelectPrompt: (prompt: string) => void
  disabled?: boolean
}) {
  return (
    <section className="flex flex-col items-start gap-3 px-5 pt-12">
      {actions.map((action, index) => (
        <FeatureCard
          key={action.title}
          action={action}
          index={index}
          onSelectPrompt={onSelectPrompt}
          disabled={disabled}
        />
      ))}
    </section>
  )
}
