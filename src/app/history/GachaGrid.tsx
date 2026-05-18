'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GachaGrid({ logs }: { logs: any[] }) {
  const router = useRouter()
  const [selectedLog, setSelectedLog] = useState<any>(null)
  const [shippingType, setShippingType] = useState('Pickup A10')
  const [processing, setProcessing] = useState(false)
  const [showQRIS, setShowQRIS] = useState(false)

  if (logs.length === 0) {
    return <p className="text-gray-500 font-mono">Belum ada stiker dari gacha. Coba tarik sekarang!</p>
  }

  const handleClaim = async () => {
    if (!selectedLog) return

    setProcessing(true)
    try {
      const res = await fetch('/api/gacha/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gachaLogId: selectedLog.id, shippingType })
      })

      if (res.ok) {
        setSelectedLog(null)
        setShowQRIS(false)
        router.refresh()
      } else {
        alert('Gagal mengklaim gacha.')
      }
    } catch (err) {
      alert('Terjadi kesalahan.')
    } finally {
      setProcessing(false)
    }
  }

  const handleClaimClick = () => {
    if (shippingType === 'Flat Rate') {
      setShowQRIS(true)
    } else {
      handleClaim()
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {logs.map((log) => (
          <div 
            key={log.id} 
            onClick={() => log.status === 'Unclaimed' && setSelectedLog(log)}
            className={`bg-cyber-gray/50 border p-2 text-center transition-all ${
              log.status === 'Unclaimed' 
                ? 'border-cyber-pink/50 cursor-pointer hover:neon-box-pink group' 
                : 'border-cyber-gray opacity-70'
            }`}
          >
            <div className="aspect-square bg-black/50 p-2 mb-2 flex items-center justify-center relative">
              <img 
                src={log.product.image_path} 
                alt={log.product.product_name}
                className={`w-full h-full object-contain filter ${
                  log.status === 'Unclaimed' ? 'drop-shadow-[0_0_5px_rgba(255,0,255,0.5)] group-hover:scale-110' : ''
                } transition-transform`}
              />
              {log.status !== 'Unclaimed' && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className={`text-[10px] font-bold px-2 py-1 ${
                    log.status === 'Selesai' ? 'bg-green-900/80 text-green-400' : 'bg-blue-900/80 text-blue-400'
                  }`}>
                    {log.status}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs font-bold text-white truncate px-1">{log.product.product_name}</p>
            <p className="text-[10px] text-gray-500 mt-1">{new Date(log.created_at).toLocaleDateString()}</p>
            {log.status === 'Unclaimed' && (
              <div className="mt-2 text-[10px] text-cyber-pink animate-pulse">Klik untuk klaim!</div>
            )}
          </div>
        ))}
      </div>

      {selectedLog && !showQRIS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-panel border border-cyber-pink/50 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-[0_0_40px_rgba(255,42,133,0.15)] animate-[fadeInUp_0.3s_ease-out]">
            <h2 className="text-xl font-bold text-white mb-4 font-mono text-center">Klaim Gacha</h2>
            
            <div className="bg-black/50 p-4 rounded-xl mb-6 flex justify-center">
              <img src={selectedLog.product.image_path} className="w-24 h-24 object-contain filter drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]" alt="Sticker" />
            </div>

            <p className="text-center font-bold text-cyber-cyan mb-6">{selectedLog.product.product_name}</p>

            <div className="space-y-4 font-mono text-sm">
              <div>
                <label className="block text-gray-400 mb-2">Pilih Cara Pengiriman</label>
                <select 
                  className="w-full bg-black/50 border border-cyber-pink text-white p-2 outline-none"
                  value={shippingType}
                  onChange={(e) => setShippingType(e.target.value)}
                >
                  <option value="Pickup A10">Ambil Sendiri di Gedung A10 (Gratis)</option>
                  <option value="Flat Rate">Kirim ke Alamat (+Rp 2.000)</option>
                </select>
                {shippingType === 'Flat Rate' && (
                  <p className="text-[10px] text-yellow-400 mt-2">*Biaya pengiriman Rp 2.000 bayar via QRIS.</p>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <button
                  onClick={handleClaimClick}
                  disabled={processing}
                  className="w-full py-3 rounded-xl cyber-button text-white font-bold disabled:opacity-50"
                >
                  {processing ? 'Memproses...' : 'Klaim Sekarang'}
                </button>
                <button
                  onClick={() => setSelectedLog(null)}
                  disabled={processing}
                  className="w-full py-3 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition-colors text-sm"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showQRIS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-panel border border-cyber-cyan/50 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-[0_0_40px_rgba(0,229,255,0.15)] animate-[fadeInUp_0.3s_ease-out]">
            <h2 className="text-2xl font-bold text-white mb-2 font-mono">Scan QRIS Ongkir</h2>
            <p className="text-gray-400 mb-6 text-sm">Pembayaran Ongkos Kirim Stiker Gacha</p>
            
            <div className="bg-white p-4 rounded-xl mb-6 mx-auto w-48 h-48 flex items-center justify-center border-4 border-cyber-cyan/30">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FakeQRIS-Shipping" alt="QRIS" className="w-full h-full object-contain" />
            </div>

            <p className="text-cyber-cyan font-mono text-xl mb-8 font-bold">
              Rp 2.000
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleClaim}
                disabled={processing}
                className="w-full py-3 rounded-xl cyber-button text-white font-bold disabled:opacity-50"
              >
                {processing ? 'Memproses...' : 'Simulasikan Pembayaran Berhasil'}
              </button>
              <button
                onClick={() => setShowQRIS(false)}
                disabled={processing}
                className="w-full py-3 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition-colors text-sm"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
