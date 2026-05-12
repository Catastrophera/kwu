import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 0; // Disable caching

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    redirect('/login')
  }

  const userId = parseInt(session.user.id)

  const transactions = await prisma.transaction.findMany({
    where: { user_id: userId },
    orderBy: { createdAt: 'desc' }
  })

  const gachaLogs = await prisma.gachaLog.findMany({
    where: { user_id: userId },
    include: { product: true },
    orderBy: { created_at: 'desc' }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-12 font-mono tracking-tighter">
        Riwayat & <span className="text-cyber-pink">Koleksiku</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Transaction History */}
        <div>
           <h2 className="text-2xl font-bold mb-6 font-mono text-cyber-cyan border-b border-cyber-gray pb-2">Riwayat Transaksi</h2>
           {transactions.length === 0 ? (
             <p className="text-gray-500 font-mono">Belum ada transaksi.</p>
           ) : (
             <div className="space-y-4">
               {transactions.map((tx) => (
                 <div key={tx.id} className="bg-cyber-gray/30 border border-cyber-gray p-4 hover:border-cyber-cyan transition-colors">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-xs text-gray-400 font-mono">ID: {tx.id.substring(0, 8)}...</span>
                     <span className={`text-xs font-bold px-2 py-1 ${tx.payment_status === 'Success' ? 'bg-green-900/50 text-green-400 border border-green-500' : 'bg-yellow-900/50 text-yellow-400 border border-yellow-500'}`}>
                       {tx.payment_status}
                     </span>
                   </div>
                   <div className="flex justify-between items-end">
                     <div>
                       <p className="text-sm text-gray-400">Shipping: {tx.shipping_type}</p>
                       <p className="text-xs text-gray-500 mt-1">{new Date(tx.createdAt).toLocaleDateString()}</p>
                     </div>
                     <div className="text-xl font-bold text-white">
                       Rp {tx.total_amount.toLocaleString('id-ID')}
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* Gacha Inventory */}
        <div>
           <h2 className="text-2xl font-bold mb-6 font-mono text-cyber-pink border-b border-cyber-gray pb-2">Koleksi Gacha</h2>
           {gachaLogs.length === 0 ? (
             <p className="text-gray-500 font-mono">Belum ada stiker dari gacha. Coba tarik sekarang!</p>
           ) : (
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
               {gachaLogs.map((log) => (
                 <div key={log.id} className="bg-cyber-gray/50 border border-cyber-pink/30 p-2 text-center group hover:neon-box-pink transition-all">
                   <div className="aspect-square bg-black/50 p-2 mb-2 flex items-center justify-center">
                     <img 
                       src={log.product.image_path} 
                       alt={log.product.product_name}
                       className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,0,255,0.5)] group-hover:scale-110 transition-transform"
                     />
                   </div>
                   <p className="text-xs font-bold text-white truncate px-1">{log.product.product_name}</p>
                   <p className="text-[10px] text-gray-500 mt-1">{new Date(log.created_at).toLocaleDateString()}</p>
                 </div>
               ))}
             </div>
           )}
           <div className="mt-8">
             <Link href="/gacha" className="inline-block border border-cyber-pink text-cyber-pink px-4 py-2 text-sm font-bold hover:bg-cyber-pink hover:text-black transition-colors">
               🎰 Tarik Gacha Lagi!
             </Link>
           </div>
        </div>
      </div>
    </div>
  )
}
