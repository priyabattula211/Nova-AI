import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { AIMessage, HumanMessage } from '@langchain/core/messages'
import { createAgent, tool } from 'langchain'
import { z } from 'zod'
import type { ChatMessage } from '../types/chat'

const GEMINI_MODEL = 'gemini-2.5-flash'
const NOTE_STORAGE_KEY = 'nova.agentNotes'

type SavedNote = {
  id: string
  text: string
  createdAt: string
}

function readNotes() {
  try {
    const rawNotes = localStorage.getItem(NOTE_STORAGE_KEY)
    return rawNotes ? (JSON.parse(rawNotes) as SavedNote[]) : []
  } catch {
    return []
  }
}

function writeNotes(notes: SavedNote[]) {
  localStorage.setItem(NOTE_STORAGE_KEY, JSON.stringify(notes))
}

function stringifyContent(content: unknown) {
  if (typeof content === 'string') {
    return content
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') {
          return part
        }

        if (part && typeof part === 'object' && 'text' in part) {
          return String(part.text)
        }

        return ''
      })
      .filter(Boolean)
      .join('\n')
      .trim()
  }

  return ''
}

function toLangChainMessage(message: ChatMessage) {
  return message.role === 'assistant'
    ? new AIMessage(message.content)
    : new HumanMessage(message.content)
}

const currentDateTimeTool = tool(
  () => {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'full',
      timeStyle: 'long',
    }).format(new Date())
  },
  {
    name: 'current_date_time',
    description: 'Get the current date and time for the user.',
    schema: z.object({}),
  },
)

const calculatorTool = tool(
  ({ expression }) => {
    const sanitizedExpression = expression.replace(/\s+/g, '')

    if (!/^[\d().+\-*/%^]+$/.test(sanitizedExpression)) {
      return 'Only numbers, parentheses, and arithmetic operators are supported.'
    }

    try {
      const jsExpression = sanitizedExpression.replace(/\^/g, '**').replace(/%/g, '/100')
      const result = Function(`"use strict"; return (${jsExpression})`)()

      if (typeof result !== 'number' || !Number.isFinite(result)) {
        return 'The expression did not produce a finite number.'
      }

      return String(result)
    } catch {
      return 'The expression could not be calculated.'
    }
  },
  {
    name: 'calculator',
    description: 'Calculate basic arithmetic expressions. Supports +, -, *, /, %, ^, and parentheses.',
    schema: z.object({
      expression: z.string().describe('A basic arithmetic expression, for example "12 * (4 + 3)".'),
    }),
  },
)

const saveNoteTool = tool(
  ({ note }) => {
    const trimmedNote = note.trim()

    if (!trimmedNote) {
      return 'No note was saved because the note was empty.'
    }

    const notes = readNotes()
    const savedNote: SavedNote = {
      id: crypto.randomUUID(),
      text: trimmedNote,
      createdAt: new Date().toISOString(),
    }

    writeNotes([savedNote, ...notes].slice(0, 50))
    return `Saved note: ${trimmedNote}`
  },
  {
    name: 'save_note',
    description: 'Save a short note, preference, reminder, or user-provided fact in local browser storage.',
    schema: z.object({
      note: z.string().describe('The note to remember.'),
    }),
  },
)

const recallNotesTool = tool(
  ({ query }) => {
    const notes = readNotes()

    if (notes.length === 0) {
      return 'No saved notes yet.'
    }

    const normalizedQuery = query.trim().toLowerCase()
    const matchingNotes = normalizedQuery
      ? notes.filter((note) => note.text.toLowerCase().includes(normalizedQuery))
      : notes

    if (matchingNotes.length === 0) {
      return 'No saved notes matched that query.'
    }

    return matchingNotes
      .slice(0, 8)
      .map((note) => `- ${note.text} (${new Date(note.createdAt).toLocaleString()})`)
      .join('\n')
  },
  {
    name: 'recall_notes',
    description: 'Recall notes previously saved with save_note from local browser storage.',
    schema: z.object({
      query: z.string().default('').describe('Optional search text for filtering saved notes.'),
    }),
  },
)

function createNovaAgent(apiKey: string) {
  const model = new ChatGoogleGenerativeAI({
    apiKey,
    model: GEMINI_MODEL,
    temperature: 0.7,
  })

  return createAgent({
    model,
    tools: [currentDateTimeTool, calculatorTool, saveNoteTool, recallNotesTool],
    systemPrompt:
      'You are Nova AI, a concise, warm, premium-feeling assistant inside a mobile chatbot app. You are a LangChain agent with tools. Use tools when they make the answer more accurate, especially for arithmetic, current date/time, and remembering or recalling user notes. Keep answers clear and practical.',
  })
}

export async function sendAgentMessage(messages: ChatMessage[], apiKey: string) {
  const trimmedApiKey = apiKey.trim()

  if (!trimmedApiKey) {
    throw new Error('A Gemini API key is required before sending a message.')
  }

  const agent = createNovaAgent(trimmedApiKey)
  const result = await agent.invoke({
    messages: messages.map(toLangChainMessage),
  })
  const responseMessages = Array.isArray(result.messages) ? result.messages : []
  const finalMessage = [...responseMessages].reverse().find((message) => message instanceof AIMessage)
  const text = stringifyContent(finalMessage?.content).trim()

  if (!text) {
    throw new Error('Nova could not produce a response.')
  }

  return text
}
