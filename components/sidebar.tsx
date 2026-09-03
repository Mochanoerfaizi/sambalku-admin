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
    <aside className="w-full shrink-0 bg-[#7f1d1d] text-white md:min-h-screen md:w-64">
      <div className="sticky top-0 z-10 p-3 sm:p-5">
        <div className="mb-4 flex items-center gap-3 sm:mb-7">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-xl sm:h-11 sm:w-11">🌶️</div>
          <div>
            <div className="text-lg font-extrabold">SambalKu</div>
            <div className="text-xs text-red-100">ADMIN SYSTEM</div>
          </div>
        </div>

        <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] sm:gap-2 md:mx-0 md:block md:space-y-1 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
          {items.map(([href, label, Icon]) => (
            <Link key={href} href={href} className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-50 hover:bg-red-800 md:gap-3">
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-4 hidden border-t border-red-800 pt-4 md:mt-8 md:block">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-100 hover:bg-red-800">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </div>
    </aside>
  );
}