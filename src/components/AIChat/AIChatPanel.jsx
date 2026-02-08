/**
 * AI Chat - PC building tutor (Groq API, free tier)
 * User adds API key in settings. Uses llama-3.1-8b-instant.
 */

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'
const STORAGE_KEY = 'pc-groq-api-key'

const SYSTEM_PROMPT = `You are a patient PC building and troubleshooting tutor. The user is learning how to build PCs, diagnose problems, and think like a technician. Answer clearly and concisely. Use simple language when appropriate, but don't dumb things down. Give practical, actionable advice. If they ask about compatibility, power, or installation, be specific.`

export default function AIChatPanel({ open, onClose }) {
  const [key, setKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '')
  const [keySaved, setKeySaved] = useState(!!localStorage.getItem(STORAGE_KEY))
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', down)
      return () => window.removeEventListener('keydown', down)
    }
  }, [open, onClose])

  const saveKey = () => {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim())
      setKeySaved(true)
      setError(null)
    }
  }

  const clearKey = () => {
    localStorage.removeItem(STORAGE_KEY)
    setKey('')
    setKeySaved(false)
  }

  const send = async () => {
    const text = input.trim()
    if (!text) return

    if (!keySaved || !localStorage.getItem(STORAGE_KEY)) {
      setError('Add your Groq API key first. Get a free key at console.groq.com')
      return
    }

    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(GROQ_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
            userMsg,
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error?.message || `API error: ${res.status}`)
      }

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || 'No response.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setError(e.message || 'Failed to get response')
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${e.message}` }])
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-end p-4 pb-20 sm:pb-4">
      <div className="bg-black/40 inset-0 absolute" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-md h-[80vh] max-h-[600px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-600 flex flex-col overflow-hidden"
      >
        <div className="px-4 py-3 bg-pc-accent flex items-center justify-between">
          <h3 className="font-bold text-white">PC Building AI</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/20 text-white">✕</button>
        </div>

        {!keySaved ? (
          <div className="p-4 space-y-3 flex-1 overflow-auto">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get a <strong>free</strong> API key from{' '}
              <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-pc-accent underline">
                console.groq.com
              </a>
              . No credit card required.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Paste your Groq API key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              />
              <button
                onClick={saveKey}
                className="px-4 py-2 bg-pc-accent text-white font-medium rounded-lg hover:bg-pc-accent-dark transition-colors"
              >
                Save
              </button>
            </div>
            <p className="text-xs text-slate-500">Key stored locally. Never sent anywhere except Groq.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">
                  Ask anything about PC building, troubleshooting, or parts. Try: &quot;How do I know if my PSU is enough?&quot;
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                      m.role === 'user'
                        ? 'bg-pc-accent text-white rounded-br-md'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-2xl rounded-bl-md">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-600">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about PC building..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
                <button
                  onClick={send}
                  disabled={loading}
                  className="px-4 py-2.5 bg-pc-accent text-white font-medium rounded-xl hover:bg-pc-accent-dark disabled:opacity-50 transition-colors"
                >
                  Send
                </button>
              </div>
              <button onClick={clearKey} className="text-xs text-slate-500 hover:text-slate-700 mt-2">
                Change API key
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
