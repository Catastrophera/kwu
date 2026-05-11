import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0; // Disable caching to always show latest products

export default async function Home() {
  const products = await prisma.product.findMany()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="relative mb-24 p-12 glass-panel rounded-3xl overflow-hidden shadow-2xl shadow-cyber-pink/5">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <span className="text-9xl font-mono font-bold text-cyber-pink tracking-tighter">01</span>
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Upgrade Your <br />
            <span className="gradient-text glitch-hover" data-text="HARDWARE">HARDWARE</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 font-light leading-relaxed">
            Premium IT-themed decals and stickers for true developers. Hack your laptop aesthetics with our curated Ukiyo-e Cyberpunk collection.
          </p>
          <div className="flex gap-4">
            <Link href="#catalog" className="cyber-button text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm inline-flex items-center gap-2">
              Access Catalog <span className="opacity-50">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Gacha Banner */}
      <div className="mb-24 p-1 rounded-2xl bg-gradient-to-r from-cyber-cyan/30 via-cyber-pink/30 to-cyber-cyan/30 hover:from-cyber-cyan hover:to-cyber-pink transition-all duration-500 shadow-xl shadow-cyber-cyan/10">
        <div className="bg-cyber-dark/90 backdrop-blur-xl rounded-xl p-10 text-center relative overflow-hidden group cursor-pointer h-full">
          <Link href="/gacha" className="absolute inset-0 z-10"></Link>
          <div className="relative z-20">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">LUCKY <span className="text-cyber-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">GACHA</span> PULL</h2>
            <p className="text-gray-400 font-light mb-8 max-w-2xl mx-auto text-lg">Feeling lucky? Try our random gacha pull for a chance to win premium stickers at a highly discounted rate.</p>
            <span className="inline-block cyber-button text-white font-bold px-8 py-3 rounded-full text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,229,255,0.2)]">INITIATE_PULL()</span>
          </div>
        </div>
      </div>

      {/* Product Catalog */}
      <div id="catalog" className="scroll-mt-24">
        <h2 className="text-3xl font-bold mb-10 tracking-tight flex items-center gap-4">
          <span className="w-8 h-1 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full"></span>
          AVAILABLE STICKERS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="glass-panel rounded-2xl hover:border-cyber-cyan/50 hover:-translate-y-2 transition-all duration-300 group flex flex-col overflow-hidden">
              <div className="aspect-square relative bg-white/5 p-8 flex items-center justify-center border-b border-white/5">
                {/* Subtle glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-pink/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={product.image_path} 
                  alt={product.product_name}
                  className="w-3/4 h-3/4 object-contain filter drop-shadow-2xl group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-500 relative z-10"
                />
                {product.is_gacha_eligible && (
                  <div className="absolute top-4 right-4 bg-cyber-cyan/20 border border-cyber-cyan/50 text-cyber-cyan text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                    Gacha Pool
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold mb-2 group-hover:text-cyber-cyan transition-colors line-clamp-1">{product.product_name}</h3>
                <p className="text-xl text-white/90 mb-6 font-mono font-medium mt-auto">Rp {product.price.toLocaleString('id-ID')}</p>
                <Link href={`/checkout?product=${product.id}`} className="w-full text-center cyber-button py-3 rounded-xl font-medium text-sm text-white/90 hover:text-white mt-auto">
                  Acquire Sticker
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
