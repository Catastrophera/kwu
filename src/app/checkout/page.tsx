'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

type Product = {
  id: number
  product_name: string
  price: number
  image_path: string
}

function CheckoutContent() {
  const { status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [shippingType, setShippingType] = useState('Pickup A10')
  const [addressInput, setAddressInput] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          if (data.user && data.user.address) {
            setAddressInput(data.user.address)
          }
        })
    }
  }, [status, router])

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(data => {
          if (data.product) {
            setProduct(data.product)
          }
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [productId])

  const [showQRIS, setShowQRIS] = useState(false)

  const handleCheckoutClick = () => {
    if (!product) return
    if (shippingType === 'Flat Rate') {
      if (!addressInput || addressInput.trim() === '') {
        alert('Alamat pengiriman wajib diisi untuk opsi Kirim ke Alamat.')
        return
      }
    }
    setShowQRIS(true)
  }

  const handleConfirmPayment = async () => {
    if (!product) return

    setProcessing(true)
    
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          totalAmount: shippingType === 'Flat Rate' ? product.price + 2000 : product.price,
          shippingType,
          address: addressInput
        })
      })

      if (res.ok) {
        setShowQRIS(false)
        router.push('/history?success=true')
      } else {
        alert('Pembelian gagal. Silakan coba lagi.')
      }
    } catch (err) {
      alert('Koneksi bermasalah, coba lagi ya.')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) return <div className="text-center py-20 font-mono text-cyber-cyan">Memuat data...</div>
  if (!product) return <div className="text-center py-20 font-mono text-red-500">Produk tidak ditemukan.</div>

  const shippingCost = shippingType === 'Flat Rate' ? 2000 : 0
  const total = product.price + shippingCost

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8 font-mono border-b border-cyber-gray pb-4 text-white">
        KONFIRMASI <span className="text-cyber-pink">PESANAN</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-cyber-gray/30 border border-cyber-gray p-6">
          <h2 className="text-xl font-bold mb-4 text-cyber-cyan font-mono">Ringkasan Pesanan</h2>
          <div className="flex gap-4 mb-6 pb-6 border-b border-cyber-gray/50">
            <div className="w-24 h-24 bg-black/50 p-2 border border-cyber-dark">
               <img src={product.image_path} alt={product.product_name} className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{product.product_name}</h3>
              <p className="text-cyber-pink font-mono mt-2">Rp {product.price.toLocaleString('id-ID')}</p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-sm">
            <div>
              <label className="block text-gray-400 mb-2">Pilih Cara Pengiriman</label>
              <select 
                className="w-full bg-black/50 border border-cyber-cyan text-white p-2 outline-none"
                value={shippingType}
                onChange={(e) => setShippingType(e.target.value)}
              >
                <option value="Pickup A10">Ambil Sendiri di Gedung A10 (Gratis)</option>
                <option value="Flat Rate">Kirim ke Alamat (+Rp 2.000)</option>
              </select>
            </div>
            
            {shippingType === 'Flat Rate' && (
              <div className="mt-4">
                <label className="block text-gray-400 mb-2">Alamat Pengiriman <span className="text-cyber-pink">*</span></label>
                <textarea 
                  className="w-full bg-black/50 border border-cyber-cyan text-white p-2 outline-none min-h-[80px]"
                  placeholder="Masukkan alamat pengiriman lengkap..."
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                />
              </div>
            )}
            
            <div className="pt-4 mt-4 border-t border-cyber-gray/50 flex justify-between text-lg font-bold">
              <span>Total Bayar</span>
              <span className="text-cyber-cyan">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Payment Simulation */}
        <div className="bg-cyber-gray/30 border border-cyber-pink neon-box-pink p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 text-cyber-pink font-mono">Simulasi Pembayaran</h2>
            <div className="bg-black/80 border border-dashed border-gray-600 p-4 text-sm text-gray-400 font-mono mb-6">
              <p className="mb-2">▶ Mode: Demo / Sandbox</p>
              <p className="mb-2">▶ Gateway: Midtrans Simulator</p>
              <p className="text-cyber-cyan">▶ Status: Menunggu konfirmasi...</p>
            </div>
            <p className="text-xs text-gray-500">
              * Ini adalah simulasi pembayaran untuk keperluan demo. Transaksi akan otomatis berhasil setelah kamu klik tombol di bawah.
            </p>
          </div>
          
          <button
            onClick={handleCheckoutClick}
            disabled={processing}
            className="w-full mt-6 bg-cyber-pink text-black font-bold py-3 uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
          >
            Bayar Sekarang
          </button>
        </div>
      </div>

      {/* Fake QRIS Modal */}
      {showQRIS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-panel border border-cyber-cyan/50 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-[0_0_40px_rgba(0,229,255,0.15)] animate-[fadeInUp_0.3s_ease-out]">
            <h2 className="text-2xl font-bold text-white mb-2">Scan QRIS</h2>
            <p className="text-gray-400 mb-6 text-sm">Simulasi Pembayaran (Tugas Kuliah)</p>
            
            <div className="bg-white p-4 rounded-xl mb-6 mx-auto w-48 h-48 flex items-center justify-center border-4 border-cyber-cyan/30">
              {/* Fake QR Code using a public dummy image or icon */}
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FakeQRIS-ITSticker" alt="QRIS" className="w-full h-full object-contain" />
            </div>

            <p className="text-cyber-cyan font-mono text-xl mb-8 font-bold">
              Rp {total.toLocaleString('id-ID')}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirmPayment}
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
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 font-mono text-cyber-cyan">Memuat halaman...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}

