"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    ['Dashboard', '⌂', '/admin'],
    ['Produk', '◧', '/admin/products'],
    ['Stok', '▦', '/admin/stock'],
    ['Pesanan', '✉', '/admin/orders'],
    ['Pengiriman', '📦', '/admin/shipping'],
    ['Pembayaran', '₱', '/admin/payments'],
    ['Rekonsiliasi', '⇄', '/admin/reconciliation'],
    ['Laporan', '📊', '/admin/reports'],
    ['Konten', '✎', '/admin/content'],
    ['Pengaturan', '⚙', '/admin/settings'],
  ];

  return (
    <aside className="w-50 border-r border-[#2a2520] p-3.5 bg-[#f3efe7] min-h-screen">
      <div className="font-cursive font-bold text-lg">◆ Admin</div>
      <div className="text-[9px] text-[#5b544c] mt-0.5">SoraStore Backoffice</div>
      
      <div className="border-t border-dashed border-[#2a2520] my-3" />
      
      {menuItems.map(([name, icon, href]) => (
        <Link 
          key={name}
          href={href}
          className={`flex items-center gap-2 py-1.75 px-2 mb-0.5 ${
            pathname === href 
              ? 'bg-[#2a2520] text-[#fbf9f4] font-bold border border-[#2a2520]' 
              : 'hover:bg-[#f3e4dc]'
          }`}
        >
          <span className="w-3.5">{icon}</span>{name}
        </Link>
      ))}
      
      <div className="border-t border-dashed border-[#2a2520] my-3" />
      
      <div className="text-xs text-[#5b544c]">
        <div>👤 Admin Toko</div>
        <div className="text-[9px] mt-0.5">admin@sorastore.id</div>
        <div className="text-[10px] mt-1.5">Keluar →</div>
      </div>
    </aside>
  );
}