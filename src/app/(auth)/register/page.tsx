'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      if (res.ok) {
        router.push('/login')
      } else {
        const data = await res.json()
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-cyber-gray/50 border border-cyber-pink/30 neon-box-pink rounded-lg backdrop-blur-sm">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            Buat <span className="text-cyber-pink">Akun</span> Baru
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Gratis! Daftar sekarang untuk mulai belanja stiker.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
             <div>
              <label className="block text-xs font-mono text-cyber-pink mb-1 uppercase">Nama Pengguna</label>
              <input
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-cyber-pink/50 bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-cyber-pink focus:border-cyber-pink sm:text-sm"
                placeholder="runner_99"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-cyber-pink mb-1 uppercase">Alamat Email</label>
              <input
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-cyber-pink/50 bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-cyber-pink focus:border-cyber-pink sm:text-sm"
                placeholder="runner@net.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-cyber-pink mb-1 uppercase">Password</label>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-cyber-pink/50 bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-cyber-pink focus:border-cyber-pink sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold bg-cyber-pink text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyber-pink transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-medium text-cyber-cyan hover:text-white transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
