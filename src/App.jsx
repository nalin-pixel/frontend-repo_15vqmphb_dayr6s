import HeaderHero from './components/HeaderHero'
import ChatTutor from './components/ChatTutor'
import QuizGenerator from './components/QuizGenerator'
import MoleculeTools from './components/MoleculeTools'
import FooterNote from './components/FooterNote'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
      <HeaderHero />
      <ChatTutor />
      <QuizGenerator />
      <MoleculeTools />
      <FooterNote />
    </div>
  )
}

export default App
