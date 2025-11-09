import { useState } from 'react'
import { ListChecks } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const TOPICS = [
  'Ionic Bonding',
  'Covalent Bonding',
  'VSEPR Theory',
]

export default function QuizGenerator() {
  const [topic, setTopic] = useState(TOPICS[0])
  const [count, setCount] = useState(5)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count })
      })
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="mb-4 text-2xl font-semibold flex items-center gap-2"><ListChecks className="h-6 w-6"/> Quiz Generator</h2>
      <div className="rounded-xl border bg-white/60 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="text-sm font-medium">Topic</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 rounded-lg border bg-white px-3 py-2 text-sm">
              {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Questions</label>
            <input type="number" min={1} max={10} value={count} onChange={(e)=>setCount(parseInt(e.target.value||'5'))} className="mt-1 w-24 rounded-lg border bg-white px-3 py-2 text-sm"/>
          </div>
          <button onClick={generate} className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Generate</button>
        </div>

        {loading && <p className="mt-4 text-sm text-gray-600">Creating your quiz…</p>}

        <ol className="mt-6 space-y-4">
          {items.map((it, idx) => (
            <li key={idx} className="rounded-lg border bg-white p-4">
              <p className="font-medium">{idx+1}. {it.question}</p>
              <ul className="mt-2 grid gap-2 md:grid-cols-2">
                {it.options.map((opt, i) => (
                  <li key={i} className={`rounded border p-2 text-sm ${i===it.correct_index ? 'border-emerald-500 bg-emerald-50' : 'bg-gray-50'}`}>
                    {String.fromCharCode(97+i)}) {opt} {i===it.correct_index && '✅'}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-gray-700">Explanation: {it.explanation}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
