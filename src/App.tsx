import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FeatureActions } from './components/FeatureActions'
import { ChatComposer } from './components/ChatComposer'
import { AmbientBackground } from './components/AmbientBackground'
import { ChatThread } from './components/ChatThread'
import { ApiKeyModal } from './components/ApiKeyModal'
import { useCurrentUser } from './hooks/useCurrentUser'
import { sendAgentMessage } from './services/agent'
import type { ChatMessage } from './types/chat'

const GEMINI_API_KEY_STORAGE_KEY = 'nova.geminiApiKey'

function readStoredApiKey() {
  try {
    return localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

function readInitialApiKey() {
  return (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim() || readStoredApiKey()
}

function App() {
  const user = useCurrentUser()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState(readInitialApiKey)
  const [showApiKeyModal, setShowApiKeyModal] = useState(() => !readInitialApiKey())
  const showIntro = messages.length === 0

  const handleApiKeySave = (newApiKey: string) => {
    const trimmedApiKey = newApiKey.trim()

    if (!trimmedApiKey) {
      return
    }

    try {
      localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, trimmedApiKey)
    } catch {
      setError('Could not save the API key locally, but it will work for this session.')
    }

    setApiKey(trimmedApiKey)
    setShowApiKeyModal(false)
  }

  const handleSend = async (prompt = draft) => {
    const trimmedPrompt = prompt.trim()

    if (!trimmedPrompt || isSending) {
      return
    }

    if (!apiKey.trim()) {
      setShowApiKeyModal(true)
      return
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedPrompt,
      createdAt: Date.now(),
    }

    setDraft('')
    setError(null)
    setIsSending(true)
    setMessages((currentMessages) => [...currentMessages, userMessage])

    try {
      const chatHistory = [...messages, userMessage]
      const reply = await sendAgentMessage(chatHistory, apiKey)
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        createdAt: Date.now(),
      }

      setMessages((currentMessages) => [...currentMessages, assistantMessage])
    } catch (unknownError) {
      const message =
        unknownError instanceof Error
          ? unknownError.message
          : 'Gemini could not respond. Please try again.'
      setError(message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-black text-white">
      <AmbientBackground />
      <div className="relative mx-auto flex min-h-svh max-w-[34rem] flex-col pb-44">
        <Header user={user} />
        {showIntro ? (
          <>
            <Hero userName={user?.name} />
            <FeatureActions onSelectPrompt={handleSend} disabled={isSending} />
          </>
        ) : (
          <ChatThread messages={messages} isSending={isSending} error={error} />
        )}
      </div>
      <ChatComposer
        value={draft}
        onChange={setDraft}
        onSubmit={handleSend}
        isSending={isSending}
        error={showIntro ? error : null}
      />
      {showApiKeyModal && <ApiKeyModal onSave={handleApiKeySave} />}
    </main>
  )
}

export default App
