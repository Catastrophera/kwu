'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-bold tracking-tighter flex items-center gap-1 glitch-hover" data-text="IT_STICKER">
              <span className="text-white">IT</span>
              <span className="gradient-text">_STICKER</span>
            </Link>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Catalog</Link>
            <Link href="/gacha" className="text-sm font-medium text-cyber-cyan hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">Gacha Pull</Link>
            
            {session ? (
              <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-6">
                <Link href="/history" className="text-sm text-gray-400 hover:text-white transition-colors">History</Link>
                <button 
                  onClick={() => signOut()} 
                  className="text-sm px-4 py-2 rounded-full border border-white/10 text-gray-300 hover:border-cyber-pink hover:text-cyber-pink transition-all bg-white/5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-6">
                <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Login</Link>
                <Link href="/register" className="text-sm px-6 py-2 rounded-full cyber-button text-white font-medium">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
