'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Product = {
  id: number
  product_name: string
  image_path: string
}

export default function GachaPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isPulling, setIsPulling] = useState(false)
  const [result, setResult] = useState<Product | null>(null)
  const [error, setError] = useState('')

  const handlePull = async () => {
    if (status !== 'authenticated') {
      router.push('/login')
      return
    }

    setIsPulling(true)
    setResult(null)
    setError('')

    // Fake delay for animation
    await new Promise(resolve => setTimeout(resolve, 2000))

    try {
      const res = await fetch('/api/gacha', {
        method: 'POST',
      })

      if (res.ok) {
        const data = await res.json()
        setResult(data.product)
      } else {
        const data = await res.json()
        setError(data.message || 'Gacha pull failed')
      }
    } catch (err) {
      setError('An error occurred during communication.')
    } finally {
      setIsPulling(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          GACHA <span className="gradient-text glitch-hover" data-text="TERMINAL">TERMINAL</span>
        </h1>
        <p className="text-gray-400 font-mono text-lg">1 Pull = Rp 10.000 (Guaranteed random IT sticker)</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Gacha Machine Visualization */}
        <div className={`relative w-72 h-72 rounded-full glass-panel flex items-center justify-center mb-16 transition-all duration-500 ${isPulling ? 'shadow-[0_0_50px_rgba(255,42,133,0.3)] border-cyber-pink/50 scale-105' : 'shadow-[0_0_30px_rgba(0,229,255,0.1)] border-cyber-cyan/30'}`}>
          {isPulling ? (
            <div className="text-center">
              <div className="w-20 h-20 border-t-4 border-cyber-pink rounded-full animate-spin mx-auto mb-6 shadow-[0_0_15px_rgba(255,42,133,0.5)]"></div>
              <p className="text-cyber-pink font-mono text-sm uppercase tracking-widest glitch-hover" data-text="DECRYPTING...">DECRYPTING...</p>
            </div>
          ) : result ? (
             <div className="text-center w-full h-full p-8 animate-[pulse_2s_ease-in-out_infinite]">
                <img 
                  src={result.image_path} 
                  alt={result.product_name}
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
             </div>
          ) : (
            <div className="text-white/20 text-8xl font-bold font-mono">?</div>
          )}
        </div>

        {error && (
          <div className="mb-10 text-red-400 font-mono text-sm bg-red-500/10 px-6 py-3 rounded-lg border border-red-500/30">
            [ERROR]: {error}
          </div>
        )}

        {result && !isPulling && (
          <div className="mb-12 text-center glass-panel p-8 rounded-2xl w-full max-w-md animate-[bounce_0.5s_ease-out]">
            <h3 className="text-cyber-cyan font-mono text-sm mb-3 uppercase tracking-widest">Item Acquired</h3>
            <p className="text-2xl font-bold text-white mb-8">{result.product_name}</p>
            <div className="flex gap-4 justify-center">
               <button onClick={() => setResult(null)} className="text-sm px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                 Acknowledge
               </button>
               <Link href="/history" className="text-sm cyber-button text-white px-6 py-2 rounded-full">
                 View Inventory
               </Link>
            </div>
          </div>
        )}

        <button
          onClick={handlePull}
          disabled={isPulling}
          className="cyber-button text-white px-12 py-4 rounded-full font-bold text-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,42,133,0.2)]"
        >
          {isPulling ? 'Processing...' : 'Initiate Pull()'}
        </button>
      </div>
    </div>
  )
}
