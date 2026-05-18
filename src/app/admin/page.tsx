'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Product = {
  id: number
  product_name: string
  price: number
  stock: number
  image_path: string
  is_gacha_eligible: boolean
}

type Order = {
  id: string | number
  type: 'Transaction' | 'Gacha'
  user_name: string
  items: string
  total_amount: number | string
  shipping_type: string
  status: string
  created_at: string
  address?: string | null
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders'>('catalog')

  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    stock: '',
    image_path: '',
    is_gacha_eligible: false
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProducts()
      fetchOrders()
    }
  }, [status])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products)
      } else if (res.status === 403) {
        router.push('/')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setFormData({
          product_name: '',
          price: '',
          stock: '',
          image_path: '',
          is_gacha_eligible: false
        })
        fetchProducts()
      } else {
        alert('Gagal menambahkan produk.')
      }
    } catch (err) {
      alert('Terjadi kesalahan.')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchProducts()
      } else {
        alert('Gagal menghapus produk. Mungkin masih ada riwayat transaksi yang terkait.')
      }
    } catch (err) {
      alert('Terjadi kesalahan.')
    }
  }

  const handleCompleteOrder = async (id: string | number, type: 'Transaction' | 'Gacha') => {
    try {
      const endpoint = type === 'Transaction' 
        ? `/api/admin/orders/${id}` 
        : `/api/admin/gacha-orders/${id}`
        
      const res = await fetch(endpoint, { method: 'PUT' })
      if (res.ok) {
        fetchOrders()
      } else {
        const errData = await res.json().catch(() => ({}))
        alert(`Gagal menyelesaikan pesanan: ${errData.message || 'Unknown error'}`)
      }
    } catch (err) {
      alert('Terjadi kesalahan.')
    }
  }

  if (loading) return <div className="text-center py-20 font-mono text-cyber-cyan">Memuat...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8 font-mono border-b border-cyber-gray pb-4 text-white flex justify-between items-end">
        <span>ADMIN <span className="text-cyber-pink">DASHBOARD</span></span>
        <div className="flex gap-4 text-lg">
          <button 
            onClick={() => setActiveTab('catalog')} 
            className={`pb-2 border-b-2 transition-colors ${activeTab === 'catalog' ? 'border-cyber-pink text-cyber-pink' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            Katalog Stiker
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`pb-2 border-b-2 transition-colors ${activeTab === 'orders' ? 'border-cyber-cyan text-cyber-cyan' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            Pesanan Masuk
          </button>
        </div>
      </h1>

      {activeTab === 'catalog' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-cyber-gray/30 border border-cyber-cyan p-6 rounded-xl h-fit">
            <h2 className="text-xl font-bold mb-6 font-mono text-cyber-cyan">Tambah Stiker</h2>
            <form onSubmit={handleAddProduct} className="space-y-4 font-mono text-sm">
              <div>
                <label className="block text-gray-400 mb-2">Nama Produk</label>
                <input required type="text" value={formData.product_name} onChange={e => setFormData({...formData, product_name: e.target.value})} className="w-full bg-black/50 border border-cyber-gray focus:border-cyber-cyan p-2 text-white outline-none" />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Harga (Rp)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black/50 border border-cyber-gray focus:border-cyber-cyan p-2 text-white outline-none" />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Stok</label>
                <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-black/50 border border-cyber-gray focus:border-cyber-cyan p-2 text-white outline-none" />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">URL Gambar (Image Path)</label>
                <input required type="text" value={formData.image_path} onChange={e => setFormData({...formData, image_path: e.target.value})} placeholder="https://..." className="w-full bg-black/50 border border-cyber-gray focus:border-cyber-cyan p-2 text-white outline-none" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={formData.is_gacha_eligible} onChange={e => setFormData({...formData, is_gacha_eligible: e.target.checked})} className="w-5 h-5 accent-cyber-pink" />
                <label className="text-gray-400">Bisa didapatkan dari Gacha?</label>
              </div>
              <button type="submit" className="w-full pt-2 mt-4 cyber-button py-2 text-white font-bold">
                + TAMBAH
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 font-mono text-white">Daftar Stiker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-black/40 border border-cyber-gray p-4 flex gap-4">
                  <div className="w-20 h-20 bg-black flex items-center justify-center border border-white/10 shrink-0">
                    <img src={p.image_path} alt={p.product_name} className="w-16 h-16 object-contain" />
                  </div>
                  <div className="flex-1 font-mono text-sm">
                    <h3 className="font-bold text-cyber-cyan text-base truncate">{p.product_name}</h3>
                    <p className="text-gray-400 mt-1">Rp {p.price.toLocaleString('id-ID')} | Stok: {p.stock}</p>
                    <p className="text-xs mt-1">
                      {p.is_gacha_eligible ? <span className="text-green-400">✓ Gacha Eligible</span> : <span className="text-red-400">✗ Not Gacha</span>}
                    </p>
                    <div className="mt-3 flex justify-end">
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500/50 px-3 py-1 rounded transition-colors text-xs">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="col-span-2 text-center text-gray-500 font-mono py-10">Belum ada produk.</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-cyber-gray/30 border border-cyber-cyan p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6 font-mono text-cyber-cyan">Antrean Pesanan</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm">
              <thead className="text-cyber-pink border-b border-cyber-gray">
                <tr>
                  <th className="pb-3 px-4">Tipe</th>
                  <th className="pb-3 px-4">Pembeli</th>
                  <th className="pb-3 px-4">Item</th>
                  <th className="pb-3 px-4">Pengiriman</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-gray/50 text-gray-300">
                {orders.map(order => (
                  <tr key={`${order.type}-${order.id}`} className="hover:bg-black/30 transition-colors">
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs border ${order.type === 'Gacha' ? 'border-cyber-pink text-cyber-pink' : 'border-cyber-cyan text-cyber-cyan'}`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-white">{order.user_name}</td>
                    <td className="py-4 px-4">{order.items}</td>
                    <td className="py-4 px-4">
                      <div>{order.shipping_type}</div>
                      {order.shipping_type === 'Flat Rate' && order.address && (
                        <div className="text-xs text-gray-400 mt-1 max-w-[200px]">
                          <span className="font-semibold text-cyber-cyan">Alamat:</span> {order.address}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs border ${
                        order.status === 'Selesai' ? 'border-green-500 text-green-400 bg-green-900/30' : 'border-yellow-500 text-yellow-400 bg-yellow-900/30'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {order.status === 'Proses' && (
                        <button 
                          onClick={() => handleCompleteOrder(order.id, order.type)}
                          className="bg-cyber-cyan text-black px-3 py-1 text-xs font-bold hover:bg-white transition-colors uppercase"
                        >
                          Tandai Selesai
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">Tidak ada pesanan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
