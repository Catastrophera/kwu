'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type UserProfile = {
  id: number
  username: string
  email: string
  role: string
  address: string | null
  phone: string | null
}

export default function ProfilePage() {
  const { status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setProfile(data.user)
            setAddress(data.user.address || '')
            setPhone(data.user.phone || '')
          }
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
          setMessage({ text: 'Gagal memuat profil.', type: 'error' })
        })
    }
  }, [status])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ text: '', type: '' })

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, phone })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ text: 'Profil berhasil diperbarui!', type: 'success' })
        setProfile(data.user)
      } else {
        setMessage({ text: data.message || 'Gagal memperbarui profil.', type: 'error' })
      }
    } catch (err) {
      setMessage({ text: 'Terjadi kesalahan pada jaringan.', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-20 font-mono text-cyber-cyan">Memuat profil...</div>
  }

  if (!profile) {
    return <div className="text-center py-20 font-mono text-red-500">Profil tidak ditemukan.</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8 font-mono border-b border-cyber-gray pb-4 text-white">
        PROFIL <span className="text-cyber-cyan">PENGGUNA</span>
      </h1>

      <div className="bg-cyber-gray/30 border border-cyber-cyan/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.1)]">
        <div className="mb-8 space-y-2 font-mono">
          <p className="text-gray-400">Username: <span className="text-white font-bold">{profile.username}</span></p>
          <p className="text-gray-400">Email: <span className="text-white font-bold">{profile.email}</span></p>
          <p className="text-gray-400">Role: <span className="text-cyber-pink font-bold">{profile.role}</span></p>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg border font-mono text-sm ${
            message.type === 'success' 
              ? 'bg-green-900/20 border-green-500/50 text-green-400' 
              : 'bg-red-900/20 border-red-500/50 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-cyber-cyan font-mono mb-2">Nomor Telepon / WhatsApp</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 08123456789"
              className="w-full bg-black/50 border border-cyber-gray focus:border-cyber-cyan p-3 text-white outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-cyber-cyan font-mono mb-2">Alamat Pengiriman (Opsional)</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Masukkan alamat lengkapmu di sini..."
              rows={4}
              className="w-full bg-black/50 border border-cyber-gray focus:border-cyber-cyan p-3 text-white outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 cyber-button text-white font-bold font-mono uppercase tracking-widest disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan Profil'}
          </button>
        </form>
      </div>
    </div>
  )
}
