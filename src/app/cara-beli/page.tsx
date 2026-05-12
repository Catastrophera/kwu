import Link from 'next/link'

export const metadata = {
  title: 'Cara Beli Stiker | IT Self-Sticker',
  description: 'Panduan lengkap cara membeli stiker IT dan bermain gacha di IT Self-Sticker.',
}

export default function CaraBeliPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Cara <span className="gradient-text">Beli & Gacha</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Panduan mudah untuk pemula — belanja stiker IT favoritmu dalam hitungan menit!
        </p>
      </div>

      {/* Section 1: Daftar/Login */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-cyber-pink/20 border border-cyber-pink/50 flex items-center justify-center text-cyber-pink font-bold text-xl flex-shrink-0">
            1
          </div>
          <h2 className="text-3xl font-bold">Buat Akun Dulu</h2>
        </div>
        <div className="glass-panel rounded-2xl p-8 border-l-4 border-cyber-pink">
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            Sebelum bisa beli atau gacha, kamu perlu punya akun terlebih dahulu. Prosesnya cepat dan gratis!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-bold text-cyber-cyan mb-2">Belum punya akun?</h3>
              <p className="text-gray-400 text-sm mb-4">Klik tombol <strong className="text-white">Daftar</strong> di pojok kanan atas, isi nama, email, dan password kamu.</p>
              <Link href="/register" className="inline-block cyber-button text-white text-sm px-6 py-2 rounded-full font-medium">
                Daftar Sekarang →
              </Link>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-3">🔑</div>
              <h3 className="font-bold text-cyber-cyan mb-2">Sudah punya akun?</h3>
              <p className="text-gray-400 text-sm mb-4">Klik <strong className="text-white">Masuk</strong> dan masukkan email serta password yang sudah kamu daftarkan.</p>
              <Link href="/login" className="inline-block border border-cyber-cyan text-cyber-cyan text-sm px-6 py-2 rounded-full font-medium hover:bg-cyber-cyan/10 transition-colors">
                Masuk →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Beli Stiker */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan font-bold text-xl flex-shrink-0">
            2
          </div>
          <h2 className="text-3xl font-bold">Cara Beli Stiker</h2>
        </div>
        <div className="glass-panel rounded-2xl p-8 border-l-4 border-cyber-cyan">
          <p className="text-gray-300 mb-6 text-lg">
            Semua stiker dijual dengan harga <span className="text-cyber-cyan font-bold text-xl">Rp 1.000</span> per stiker. Murah banget!
          </p>
          <div className="space-y-4">
            {[
              { icon: '🛍️', step: 'Buka halaman Katalog', desc: 'Lihat semua koleksi stiker IT yang tersedia — ada Python, JavaScript, Docker, dan masih banyak lagi!' },
              { icon: '👆', step: 'Klik "Beli Sekarang"', desc: 'Pilih stiker yang kamu suka, lalu klik tombol "Beli Sekarang" di kartu produknya.' },
              { icon: '🚚', step: 'Pilih cara pengiriman', desc: 'Bisa ambil sendiri di Gedung A10 (gratis) atau kirim ke alamat dengan biaya tambahan Rp 2.000.' },
              { icon: '💳', step: 'Konfirmasi pembayaran', desc: 'Klik "Bayar Sekarang". Ini adalah simulasi pembayaran — transaksi akan langsung berhasil secara otomatis.' },
              { icon: '✅', step: 'Selesai!', desc: 'Pesananmu tercatat di halaman Riwayat. Kamu bisa cek status transaksimu di sana.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-white mb-1">{item.step}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/#catalog" className="inline-block cyber-button text-white px-8 py-3 rounded-full font-bold">
              Lihat Katalog →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Cara Gacha */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400 font-bold text-xl flex-shrink-0">
            3
          </div>
          <h2 className="text-3xl font-bold">Cara Main Gacha</h2>
        </div>
        <div className="glass-panel rounded-2xl p-8 border-l-4 border-yellow-400/70">
          <p className="text-gray-300 mb-2 text-lg">
            Gacha adalah cara seru mendapat stiker secara <strong className="text-white">acak</strong> dengan harga lebih murah!
          </p>
          <p className="text-yellow-400 font-bold text-2xl mb-6">🎰 Hanya Rp 500 per tarikan!</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '🎯', title: 'Kamu tarik', desc: 'Klik tombol "Tarik Gacha!" di halaman Gacha.' },
              { icon: '🎲', title: 'Sistem acak', desc: 'Sistem memilih 1 stiker dari semua koleksi secara acak.' },
              { icon: '🎁', title: 'Kamu dapat!', desc: 'Stiker yang kamu dapat langsung masuk ke koleksimu.' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 mb-6">
            <p className="text-yellow-400 font-bold mb-1">⚠️ Perlu diingat:</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Stiker yang keluar bersifat <strong className="text-white">acak</strong> — bisa stiker apapun dari koleksi</li>
              <li>Akan ada konfirmasi dulu sebelum tarikan diproses</li>
              <li>Kamu perlu <strong className="text-white">login</strong> untuk bisa gacha</li>
            </ul>
          </div>

          <Link href="/gacha" className="inline-block cyber-button text-white px-8 py-3 rounded-full font-bold">
            Coba Gacha Sekarang! 🎰
          </Link>
        </div>
      </section>

      {/* Section 4: Riwayat */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-green-400/20 border border-green-400/50 flex items-center justify-center text-green-400 font-bold text-xl flex-shrink-0">
            4
          </div>
          <h2 className="text-3xl font-bold">Cek Riwayat & Koleksimu</h2>
        </div>
        <div className="glass-panel rounded-2xl p-8 border-l-4 border-green-400/70">
          <p className="text-gray-300 mb-6 text-lg">
            Semua transaksi dan stiker hasil gacha tersimpan di halaman <strong className="text-white">Riwayat</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold text-white mb-2">Riwayat Transaksi</h3>
              <p className="text-gray-400 text-sm">Lihat semua pembelian yang pernah kamu lakukan, beserta status dan total harganya.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-bold text-white mb-2">Koleksi Gacha</h3>
              <p className="text-gray-400 text-sm">Semua stiker yang kamu dapat dari gacha akan tampil di sini sebagai koleksimu.</p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/history" className="inline-block border border-green-400/50 text-green-400 px-8 py-3 rounded-full font-bold hover:bg-green-400/10 transition-colors">
              Lihat Riwayatku →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Pertanyaan Umum</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Apakah saya harus daftar untuk lihat katalog?',
              a: 'Tidak perlu! Kamu bisa melihat katalog stiker tanpa login. Tapi untuk beli atau gacha, kamu perlu punya akun dulu.'
            },
            {
              q: 'Apa itu simulasi pembayaran?',
              a: 'Ini adalah proyek demo/tugas, jadi pembayarannya tidak nyata. Setelah klik "Bayar Sekarang", transaksi akan otomatis berhasil tanpa perlu transfer uang beneran.'
            },
            {
              q: 'Stiker gacha bisa sama dengan yang sudah saya punya?',
              a: 'Ya, bisa! Karena sistem memilih secara acak dari semua koleksi yang tersedia.'
            },
            {
              q: 'Di mana saya ambil stiker yang sudah dibeli?',
              a: 'Untuk opsi "Ambil Sendiri", stiker bisa diambil di Gedung A10 Teknik Informatika. Untuk pengiriman, stiker akan dikirim ke alamat yang kamu daftarkan.'
            },
            {
              q: 'Kenapa saya tidak bisa gacha?',
              a: 'Pastikan kamu sudah login terlebih dahulu. Klik "Masuk" di pojok kanan atas, lalu coba lagi.'
            },
          ].map((item, i) => (
            <details key={i} className="glass-panel rounded-xl overflow-hidden group">
              <summary className="p-6 cursor-pointer font-bold text-white flex justify-between items-center hover:text-cyber-cyan transition-colors list-none">
                <span>❓ {item.q}</span>
                <span className="text-gray-500 group-open:text-cyber-cyan transition-colors ml-4 flex-shrink-0">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <div className="mt-16 text-center glass-panel rounded-2xl p-10">
        <p className="text-gray-400 mb-6 text-lg">Masih ada pertanyaan? Hubungi kami lewat WhatsApp!</p>
        <a
          href="https://wa.me/6281234567890?text=Halo%20IT%20Self-Sticker%2C%20saya%20mau%20bertanya%20tentang%20cara%20beli!"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3 rounded-full transition-colors"
        >
          💬 Chat WhatsApp
        </a>
      </div>
    </div>
  )
}
