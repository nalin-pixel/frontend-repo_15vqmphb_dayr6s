import { Atom, MessageCircleQuestion, FlaskConical, Sparkles } from 'lucide-react'

export default function HeaderHero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Atom className="h-8 w-8" />
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                ChemBond Tutor
              </h1>
            </div>
            <p className="mt-3 max-w-2xl text-white/90">
              Learn chemical bonding with a friendly AI tutor. Ask questions, practice with quizzes,
              and explore molecules with clear, visual explanations.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                <MessageCircleQuestion className="h-4 w-4" /> Chatbot
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                <FlaskConical className="h-4 w-4" /> Quiz Generator
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                <Sparkles className="h-4 w-4" /> Molecule Insights
              </span>
            </div>
          </div>
          <div className="rounded-xl bg-white/10 px-5 py-4 text-sm backdrop-blur">
            <p className="font-semibold">Quick Tip</p>
            <p className="text-white/90">Try: “Explain ionic bonding” or “Analyze molecule CO2”.</p>
          </div>
        </div>
      </div>
    </header>
  )
}
