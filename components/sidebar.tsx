import Link from "next/link";
import {
  LayoutDashboard, Package, ShoppingCart, ReceiptText, WalletCards,
  BarChart3, Settings, LogOut
} from "lucide-react";

const items = [
  ["/", "Dashboard", LayoutDashboard],
  ["/produk", "Produk", Package],
  ["/modal", "Modal / Belanja", ShoppingCart],
  ["/penjualan", "Penjualan", ReceiptText],
  ["/pengeluaran", "Pengeluaran", WalletCards],
  ["/saldo", "Saldo Harian", WalletCards],
  ["/laporan", "Laporan", BarChart3],
  ["/pengaturan", "Pengaturan", Settings]
] as const;

export function Sidebar() {
  return (
    <aside className="w-full bg-[#7f1d1d] text-white md:min-h-screen md:w-64">
      <div className="sticky top-0 p-5">
        <div className="mb-7 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-xl">🌶️</div>
          <div>
            <div className="text-lg font-extrabold">SambalKu</div>
            <div className="text-xs text-red-100">ADMIN SYSTEM</div>
          </div>
        </div>

        <nav className="space-y-1">
          {items.map(([href, label, Icon]) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-50 hover:bg-red-800">
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 border-t border-red-800 pt-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-100 hover:bg-red-800">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </div>
    </aside>
  );
}