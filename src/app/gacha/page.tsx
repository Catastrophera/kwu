'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Product = {
  id: number
  product_name: string
  image_path: string
}

// Pool of icons for the reel animation
const REEL_ICONS = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
]

type AnimPhase = 'idle' | 'fast' | 'slowing' | 'done'

export default function GachaPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isPulling, setIsPulling] = useState(false)
  const [result, setResult] = useState<Product | null>(null)
  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [phase, setPhase] = useState<AnimPhase>('idle')
  const [reelIndex, setReelIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pendingResult = useRef<Product | null>(null)

  // Slot machine ticker logic
  useEffect(() => {
    if (phase === 'fast') {
      // Fast spin: change icon every 80ms
      intervalRef.current = setInterval(() => {
        setReelIndex(i => (i + 1) % REEL_ICONS.length)
      }, 80)
    } else if (phase === 'slowing') {
      // Slow spin: gradually increase interval to simulate deceleration
      let delay = 120
      const slowDown = () => {
        intervalRef.current = setTimeout(() => {
          setReelIndex(i => (i + 1) % REEL_ICONS.length)
          delay = Math.min(delay * 1.4, 600)
          if (delay < 580) {
            slowDown()
          } else {
            // Land on the result icon
            if (pendingResult.current) {
              setReelIndex(-1) // signal to show result icon
            }
            setTimeout(() => {
              setPhase('done')
              setShowResult(true)
              setIsPulling(false)
            }, 400)
          }
        }, delay)
      }
      slowDown()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as ReturnType<typeof setInterval>)
        clearTimeout(intervalRef.current as ReturnType<typeof setTimeout>)
        intervalRef.current = null
      }
    }
  }, [phase])

  const handleConfirmPull = () => {
    if (status !== 'authenticated') {
      router.push('/login')
      return
    }
    setShowConfirm(true)
  }

  const handlePull = async () => {
    setShowConfirm(false)
    setIsPulling(true)
    setResult(null)
    setShowResult(false)
    setError('')
    pendingResult.current = null
    setPhase('fast')

    try {
      const res = await fetch('/api/gacha', { method: 'POST' })

      if (res.ok) {
        const data = await res.json()
        pendingResult.current = data.product

        // After 2s of fast spin, start slowing down
        setTimeout(() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current as ReturnType<typeof setInterval>)
            intervalRef.current = null
          }
          setResult(data.product)
          setPhase('slowing')
        }, 2000)
      } else {
        const data = await res.json()
        setError(data.message || 'Gacha gagal. Coba lagi ya!')
        setPhase('idle')
        setIsPulling(false)
      }
    } catch (err) {
      setError('Koneksi bermasalah. Coba lagi.')
      setPhase('idle')
      setIsPulling(false)
    }
  }

  const currentIcon = reelIndex === -1 && result
    ? result.image_path
    : REEL_ICONS[reelIndex]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-panel border border-cyber-cyan/50 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-[0_0_40px_rgba(0,229,255,0.15)]">
            <div className="text-5xl mb-4">🎰</div>
            <h2 className="text-2xl font-bold text-white mb-2">Yakin mau tarik?</h2>
            <p className="text-gray-400 mb-2">Kamu akan mengeluarkan</p>
            <p className="text-3xl font-bold text-cyber-cyan mb-6">Rp 500</p>
            <p className="text-sm text-gray-500 mb-8">Kamu akan mendapat 1 stiker IT secara acak dari koleksi kami.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handlePull}
                className="flex-1 py-3 rounded-xl cyber-button text-white font-bold"
              >
                Tarik Sekarang!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          MESIN <span className="gradient-text glitch-hover" data-text="GACHA">GACHA</span>
        </h1>
        <p className="text-gray-400 text-lg">
          1 Tarikan = <span className="text-cyber-cyan font-bold">Rp 500</span> (Dapat stiker IT secara acak!)
        </p>
        {status !== 'authenticated' && (
          <p className="text-yellow-400/80 text-sm mt-3">
            Kamu perlu <Link href="/login" className="underline text-cyber-cyan">login</Link> dulu untuk bisa tarik gacha.
          </p>
        )}
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Slot Machine Frame */}
        <div className="relative mb-10">
          {/* Machine body */}
          <div className={`
            relative w-80 rounded-3xl overflow-hidden border-2 transition-all duration-300
            ${phase === 'fast' ? 'border-cyber-pink shadow-[0_0_60px_rgba(255,42,133,0.4)]' : ''}
            ${phase === 'slowing' ? 'border-cyber-pink shadow-[0_0_40px_rgba(255,42,133,0.3)]' : ''}
            ${phase === 'done' ? 'border-cyber-cyan shadow-[0_0_50px_rgba(0,229,255,0.4)]' : ''}
            ${phase === 'idle' ? 'border-white/10 shadow-[0_0_30px_rgba(0,229,255,0.05)]' : ''}
            glass-panel
          `}>
            {/* Top labels */}
            <div className="flex justify-between px-6 py-3 border-b border-white/10 bg-black/30">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">IT Sticker</span>
              <span className={`text-xs font-mono uppercase tracking-widest transition-colors ${phase === 'fast' || phase === 'slowing' ? 'text-cyber-pink animate-pulse' : 'text-gray-600'}`}>
                {phase === 'fast' ? '▶ Rolling...' : phase === 'slowing' ? '▶ Landing...' : phase === 'done' ? '★ Hit!' : '● Ready'}
              </span>
            </div>

            {/* Reel window */}
            <div className="relative h-72 bg-black/60 overflow-hidden flex items-center justify-center">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none z-10" />
              {/* Center highlight */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-28 border-y-2 border-cyber-cyan/30 bg-cyber-cyan/5 pointer-events-none z-10" />

              {/* Icon reel */}
              {phase === 'idle' ? (
                <div className="text-white/15 text-9xl font-black select-none">?</div>
              ) : (
                <div
                  key={reelIndex}
                  className={`
                    flex items-center justify-center w-full h-full p-8
                    ${phase === 'fast' ? 'animate-[slideInUp_0.08s_ease-out]' : ''}
                    ${phase === 'slowing' ? 'animate-[slideInUp_0.2s_ease-out]' : ''}
                    ${phase === 'done' ? 'animate-[zoomIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)_both]' : ''}
                  `}
                >
                  <img
                    src={currentIcon}
                    alt="stiker"
                    className={`
                      object-contain transition-all
                      ${phase === 'done'
                        ? 'w-44 h-44 drop-shadow-[0_0_30px_rgba(0,229,255,0.6)] filter'
                        : 'w-36 h-36 opacity-80'
                      }
                    `}
                  />
                </div>
              )}
            </div>

            {/* Bottom status bar */}
            <div className="px-6 py-3 border-t border-white/10 bg-black/30 flex justify-between items-center">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${phase !== 'idle' ? 'bg-cyber-pink animate-pulse' : 'bg-white/20'}`} style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
              <span className="text-xs font-mono text-gray-500">Rp 500 / tarikan</span>
            </div>
          </div>

          {/* Side decorations */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full border transition-all duration-200 ${phase === 'fast' ? 'border-cyber-pink bg-cyber-pink/50' : 'border-white/20 bg-transparent'}`} style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full border transition-all duration-200 ${phase === 'fast' ? 'border-cyber-cyan bg-cyber-cyan/50' : 'border-white/20 bg-transparent'}`} style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        </div>

        {/* Result card */}
        {showResult && result && (
          <div className="mb-10 text-center glass-panel p-8 rounded-2xl w-full max-w-md border border-cyber-cyan/40 shadow-[0_0_30px_rgba(0,229,255,0.15)] animate-[fadeInUp_0.5s_ease-out_both]">
            <h3 className="text-cyber-cyan font-mono text-sm mb-3 uppercase tracking-widest">🎉 Selamat! Kamu dapat:</h3>
            <p className="text-2xl font-bold text-white mb-6">{result.product_name}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => { setResult(null); setShowResult(false); setPhase('idle') }}
                className="text-sm px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                Tarik Lagi
              </button>
              <Link href="/history" className="text-sm cyber-button text-white px-6 py-2 rounded-full">
                Lihat Koleksiku
              </Link>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 text-red-400 text-sm bg-red-500/10 px-6 py-3 rounded-lg border border-red-500/30">
            {error}
          </div>
        )}

        <button
          onClick={handleConfirmPull}
          disabled={isPulling}
          className="cyber-button text-white px-12 py-4 rounded-full font-bold text-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,42,133,0.2)] transition-all"
        >
          {isPulling ? 'Sedang Mengundi...' : '🎰 Tarik Gacha!'}
        </button>

        <Link href="/cara-beli" className="mt-8 text-sm text-gray-500 hover:text-cyber-cyan transition-colors underline">
          Cara bermain gacha →
        </Link>
      </div>
    </div>
  )
}
