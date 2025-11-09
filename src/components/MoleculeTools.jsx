import { useState } from 'react'
import { FlaskRound, Beaker, Cube, AugmentedReality } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function MoleculeTools() {
  const [formula, setFormula] = useState('H2O')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/molecule/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formula })
      })
      const d = await res.json()
      setData(d)
    } catch (e) {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-2xl font-semibold flex items-center gap-2"><Beaker className="h-6 w-6"/> Molecule Explorer</h2>
      </div>

      <div className="rounded-xl border bg-white/60 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="text-sm font-medium">Molecule (e.g., H2O, CO2, CH4, NH3, NaCl)</label>
            <input value={formula} onChange={(e)=>setFormula(e.target.value)} className="mt-1 w-56 rounded-lg border bg-white px-3 py-2 text-sm" />
          </div>
          <button onClick={analyze} className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Analyze</button>
        </div>

        {loading && <p className="mt-4 text-sm text-gray-600">Analyzing molecule…</p>}

        {data && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-white p-4">
              <h3 className="mb-2 font-semibold">Analysis</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Molecule:</span> {data.formula} {data.name ? `(${data.name})` : ''}</p>
                <p><span className="font-medium">Type of Bond:</span> {data.bond_type}</p>
                <p><span className="font-medium">Bond Angle:</span> {data.bond_angle !== null ? `${data.bond_angle}°` : 'Not applicable'}</p>
                <p><span className="font-medium">Single Bonds:</span> {data.single_bonds} | <span className="font-medium">Double Bonds:</span> {data.double_bonds}</p>
                {data.shape && <p><span className="font-medium">Shape:</span> {data.shape}</p>}
              </div>
              <p className="mt-3 text-sm text-gray-700">{data.explanation}</p>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <h3 className="mb-2 font-semibold">Lewis Structure (Image)</h3>
              <img src={data.lewis_svg} alt={`Lewis structure of ${data.formula}`} className="w-full rounded border bg-white"/>
              <p className="mt-2 text-sm text-gray-700">{data.lewis_text}</p>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <h3 className="mb-2 font-semibold flex items-center gap-2"><Cube className="h-5 w-5"/> 3D Simulation (Text)</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {data.formula === 'H2O' && '3D View (simulated): Bent molecule with ~104.5° angle; O at center, two H atoms forming a V shape.'}
                {data.formula === 'CO2' && '3D View (simulated): Linear molecule O=C=O with 180° bond angle.'}
                {data.formula === 'CH4' && '3D View (simulated): Tetrahedral molecule with H atoms at the corners; 109.5° bond angles.'}
                {data.formula === 'NH3' && '3D View (simulated): Trigonal pyramidal with a lone pair at the apex; ~107°.'}
                {data.formula === 'NaCl' && '3D View (simulated): Ionic lattice; not a discrete molecular geometry.'}
                {(!['H2O','CO2','CH4','NH3','NaCl'].includes(data.formula)) && '3D View (simulated): Text preview only. Full version would render an interactive 3D model here.'}
              </p>
              <p className="mt-2 text-xs text-gray-500">Note: In the full app, this would render an interactive 3D scene or AR view.</p>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <h3 className="mb-2 font-semibold flex items-center gap-2"><AugmentedReality className="h-5 w-5"/> AR Preview (Text)</h3>
              <p className="text-sm text-gray-700">AR (simulated): You would see the molecule floating in your space. You could walk around it and inspect bond angles and geometry. This demo shows a text-only preview.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
