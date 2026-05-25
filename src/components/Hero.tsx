import { motion } from 'framer-motion'

export function Hero({ userName }: { userName?: string | null }) {
  const greeting = userName?.trim() ? `Hi, ${userName.trim()}` : 'Hi there'

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut', delay: 0.08 }}
      className="px-5 pt-20 sm:pt-24"
    >
      <p className="mb-4 text-[1.75rem] font-medium leading-none text-white/90">{greeting}</p>
      <h1 className="max-w-[22rem] text-[2.75rem] font-semibold leading-[1.08] tracking-[0] text-white sm:max-w-[31rem] sm:text-6xl">
        I&apos;m ready to help you plan, study, bring ideas to life &amp; more.
      </h1>
    </motion.section>
  )
}
