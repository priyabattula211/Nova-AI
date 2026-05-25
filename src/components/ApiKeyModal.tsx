import { useState } from 'react'
import { motion } from 'framer-motion'
import { KeyRound, ShieldCheck } from 'lucide-react'

export function ApiKeyModal({
  onSave,
}: {
  onSave: (apiKey: string) => void
}) {
  const [apiKey, setApiKey] = useState('')

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 backdrop-blur-xl">
      <motion.form
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-[28rem] rounded-[1.75rem] border border-white/10 bg-[#17181d]/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.62)]"
        onSubmit={(event) => {
          event.preventDefault()
          const trimmedApiKey = apiKey.trim()

          if (trimmedApiKey) {
            onSave(trimmedApiKey)
          }
        }}
      >
        <div className="mb-5 flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cyan-300/10 text-cyan-100">
            <KeyRound size={20} />
          </span>
          <div>
            <h2 className="text-xl font-semibold tracking-[0] text-white">Add Gemini API key</h2>
            <p className="mt-1 text-sm leading-6 text-white/58">
              Enter your key to enable Nova AI in this development build.
            </p>
          </div>
        </div>

        <label className="sr-only" htmlFor="gemini-api-key">
          Gemini API key
        </label>
        <input
          id="gemini-api-key"
          autoComplete="off"
          autoFocus
          className="h-13 w-full rounded-2xl border border-white/10 bg-black/24 px-4 text-white outline-none transition placeholder:text-white/34 focus:border-cyan-300/45"
          placeholder="Paste your Gemini API key"
          type="password"
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
        />

        <div className="mt-4 flex items-center gap-2 text-xs leading-5 text-white/48">
          <ShieldCheck size={15} className="shrink-0 text-cyan-100/80" />
          <span>Saved locally in this browser for development.</span>
        </div>

        <button
          className="mt-5 h-12 w-full rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 px-5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.42)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!apiKey.trim()}
          type="submit"
        >
          Continue
        </button>
      </motion.form>
    </div>
  )
}
