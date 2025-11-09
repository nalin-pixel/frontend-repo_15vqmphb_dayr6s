import { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ChatTutor() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am your chemistry buddy. Ask me about ionic, covalent, metallic, coordinate, or hydrogen bonding — or say “Analyze molecule H2O”.' }
  ])
  const [loading, setLoading] = useState(false)

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', text: data.reply }])
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', text: 'Sorry, I could not reach the tutor service.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="mb-4 text-2xl font-semibold">Chatbot</h2>
      <div className="rounded-xl border bg-white/60 p-4 shadow-sm backdrop-blur">
        <div className="mb-4 h-64 overflow-y-auto rounded-lg border bg-white p-3">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-[80%] whitespace-pre-line rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-500"><Sparkles className="h-4 w-4 animate-pulse"/>Thinking…</div>
          )}
        </div>
        <form onSubmit={send} className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask: Why is H2O polar? What is covalent bonding?"
            className="flex-1 rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <Send className="h-4 w-4" /> Send
          </button>
        </form>
      </div>
    </section>
  )
}
